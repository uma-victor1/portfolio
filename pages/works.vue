<template>
	<div class="p-8">
		<h1 class="pb-6 text-xl">Works!</h1>
		<p class="text-gray-500">
			I have been working lately with vue alot. <br />Here are some of the
			projects
		</p>
		<div>
			<div class="flex flex-wrap mt-8">
				<div class="w-full mb-4 md:w-1/2 lg:w-1/3 h-48 bg-green-300"></div>
				<div class="w-full mb-4 md:w-1/2 lg:w-1/3 h-48 bg-green-300"></div>
				<div class="w-full mb-4 md:w-1/2 lg:w-1/3 h-48 bg-green-300"></div>
				<div class="w-full mb-4 md:w-1/2 lg:w-1/3 h-48 bg-green-300"></div>
				<div class="w-full mb-4 md:w-1/2 lg:w-1/3 h-48 bg-green-300"></div>
				<div class="w-full mb-4 md:w-1/2 lg:w-1/3 h-48 bg-green-300"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		async asyncData($axios) {
			const repos = await $axios.$get('/')
			return { repos }
		}
	}
</script>

<style></style>
