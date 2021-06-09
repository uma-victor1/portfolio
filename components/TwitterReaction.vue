<template>
	<div>
		<button @click="addReaction" class="focus:outline-none">
			{{ initialReaction }}
			<svg
				class="w-6 h-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
				></path>
			</svg>
		</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			initialReaction: null
		}
	},
	async fetch() {
		const { data } = await this.$axios.get(
			`/.netlify/functions/fetch_reactions?slug=${this.$route.params.slug}`
		)
		this.initialReaction = data.reactions
	},
	fetchOnServer: false,
	methods: {
		addReaction() {
			this.initialReaction++
			this.incrementLikes()
		},
		async incrementLikes() {
			await this.$axios.post(
				`/.netlify/functions/increment_reactions?slug=${this.$route.params.slug}`
			)
		}
	}
}
</script>
<style>
</style>