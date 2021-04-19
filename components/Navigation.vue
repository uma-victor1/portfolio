<template>
	<div>
		<header>
			<nav class="px-8 pt-2">
				<div class="-mb-px flex justify-center">
					<NuxtLink
						class="no-underline text-teal-dark border-b-2 border-teal-dark uppercase tracking-wide font-bold text-xs py-3 mr-8"
						to="/"
					>
						<img class="w-16" src="~/assets/NavigationIcons/home.svg" />
					</NuxtLink>
					<NuxtLink
						class="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8"
						to="/works"
					>
						<img class="w-16" src="~/assets/NavigationIcons/folder.svg" />
					</NuxtLink>
					<NuxtLink
						class="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8"
						to="blog"
					>
						<img class="w-16" src="~/assets/NavigationIcons/edit.svg" />
					</NuxtLink>
					<NuxtLink
						class="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3"
						to="contact"
					>
						<img class="w-16" src="~/assets/NavigationIcons/mail.svg" />
					</NuxtLink>
				</div>
			</nav>
		</header>
	</div>
</template>
