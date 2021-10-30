<script>
	import { openMediaDevices, getConnectedDevices } from '$lib/utils/media';
	import { devices, images, userStream, userVideo } from '$lib/stores';
	import useVideo from '$lib/utils/useVideo';
	import { goto } from '$app/navigation';
	import Devices from '$lib/components/Devices.svelte';

	let openCamera = false;
	let canvas;

	async function startCapture() {
		try {
			openCamera = true;
			$userStream = await openMediaDevices();
			$devices = await getConnectedDevices();
		} catch (error) {
			console.log('error in media devices : ', error);
		}
	}

	function captureImage() {
		canvas.getContext('2d').drawImage($userVideo, 0, 0, canvas.width, canvas.height);
		const url = canvas.toBlob((blob) => {
			const url = URL.createObjectURL(blob);
			images.addImage(url);
		});

		closeCamera();

		goto('/images');
	}

	function closeCamera() {
		openCamera = false;

		$userVideo.srcObject.getTracks().forEach((track) => track.stop());
	}
</script>

<main>
	<div class="hero min-h-screen bg-base-200">
		<div class="text-center hero-content">
			<video
				hidden={!openCamera}
				bind:this={$userVideo}
				use:useVideo={$userStream}
				autoplay
				controls={false}
			>
				<track kind="captions" />
			</video>

			<canvas hidden={true} bind:this={canvas} width="720" height="480" />

			{#if openCamera}
				<button on:click={captureImage} class="btn btn-primary">Capture</button>
			{/if}

			<div class="max-w-md">
				{#if !openCamera}
					<h1 class="mb-5 text-5xl font-bold">Picture gallery</h1>
					<p class="mb-5">Click image and view in images tab</p>
				{/if}
				{#if openCamera}
					<button class="btn btn-primary" on:click={closeCamera}>Close Camera</button>
				{:else}
					<button class="btn btn-primary" on:click={startCapture}>Open Camera</button>
				{/if}
				<Devices />
			</div>
		</div>
	</div>
</main>
