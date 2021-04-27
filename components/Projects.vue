<template>
	<div
		v-if="project.description"
		class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20"
	>
		<div>
			<h2 class="text-gray-800 text-3xl font-semibold">{{ project.name }}</h2>
			<p class="mt-2 text-gray-600">
				{{ project.description }}
			</p>
		</div>
		<div class="flex justify-end mt-4">
			<a href="#" class="text-xl font-medium text-indigo-500">{{
				project.language
			}}</a>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'Test',
		props: {
			project: {
				type: Object
			}
		}
	}
</script>
