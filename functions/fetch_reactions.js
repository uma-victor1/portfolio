const faunadb = require('faunadb');
exports.handler = async (event) => {
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.YOUR_FAUNA_SECRET_KEY,
  });

  const { slug } = event.queryStringParameters;
  if (!slug) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Blog slug not available',
      }),
    };
  }

  const doesDocExist = await client.query(
    q.Exists(q.Match(q.Index('reaction_count'), slug))
  );

  if (!doesDocExist) {
    await client.query(
      q.Create(q.Collection('reactions'), {
        data: { slug: slug, reactions: 1 },
      })
    );
  }

  const document = await client.query(
    q.Get(q.Match(q.Index('reaction_count'), slug))
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      reactions: document.data.reactions,
    }),
  };
};