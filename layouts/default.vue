<template>
	<div class="nav m-auto max-w-screen-lg py-16">
		<Navigation />
		<div class="w-3/4 m-auto bg-gray-200"><Nuxt /></div>
	</div>
</template>

<style>
	html {
		font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
			'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		font-size: 16px;
		word-spacing: 1px;
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		box-sizing: border-box;
	}

	*,
	*::before,
	*::after {
		box-sizing: border-box;
		margin: 0;
	}
	body {
		background: #000000; /* fallback for old browsers */
		background: -webkit-linear-gradient(
			to left,
			#434343,
			#000000
		); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(
			to left,
			#434343,
			#000000
		); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}
</style>
