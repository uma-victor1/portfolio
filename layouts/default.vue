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
		background-image: url('../assets/bg.jpg');
		background-repeat: repeat, no-repeat;
		background-size: auto, 100% 100%;
		background-attachment: fixed;
		overflow-y: scroll;
	}
</style>
