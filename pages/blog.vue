<template>
	<div>
		<h1>MY ARTICLES</h1>
		<div v-for="article in articles" :key="article">
			<nuxt-link
				:to="{ name: 'articles-slug', params: { slug: article.slug } }"
			>
				<div>
					<div
						:style="{
							'background-image':
								'url(' + require('~/assets/blogImages/vue-img.png') + ')'
						}"
						class="
							shadow-lg
							group
							container
							rounded-md
							bg-white
							max-w-sm
							flex
							justify-center
							items-center
							mx-auto
							content-div
						"
					>
						<div>
							<div class="w-full image-cover rounded-t-md">
								<div
									class="
										p-2
										m-4
										w-16
										h-16
										text-center
										bg-gray-700
										rounded-full
										text-white
										float-right
										fd-cl
										group-hover:opacity-25
									"
								>
									<span
										class="
											text-xs
											tracking-wide
											font-bold
											uppercase
											block
											font-sans
										"
										>{{ article.date }}</span
									>
								</div>
							</div>
							<div
								class="
									py-8
									px-4
									bg-white
									rounded-b-md
									fd-cl
									group-hover:opacity-25
								"
							>
								<span
									class="block text-lg text-gray-800 font-bold tracking-wide"
									>{{ article.title }}</span
								>
								<span class="block text-gray-600 text-sm"
									>{{ article.description }}
								</span>
							</div>
						</div>
					</div>
				</div>
			</nuxt-link>
		</div>
	</div>
</template>

<script>
export default {
	async asyncData({ $content, params }) {
		const articles = await $content('blog', params.slug)
			.sortBy('createdAt', 'asc')
			.fetch()

		return {
			articles
		}
	}
}
</script>
<style>
.content-div {
	background-image: url('https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80');
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}
</style>