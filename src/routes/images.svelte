<script>
	import { images } from '$lib/stores';
</script>

<div class="grid grid-cols-3 gap-3">
	{#each $images as image (image)}
		<div class="card bordered">
			<figure>
				<img src={image} />
			</figure>
		</div>
	{/each}
</div>
