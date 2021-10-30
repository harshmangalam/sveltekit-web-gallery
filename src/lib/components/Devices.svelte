<script>
	import { devices } from '$lib/stores';
	import { getConnectedDevices } from '$lib/utils/media';
	import { onMount } from 'svelte';

	onMount(async () => {
		$devices = await getConnectedDevices();
	});
</script>

<label for="devices" class="btn btn-primary modal-button">Available Devices</label>
<input type="checkbox" id="devices" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		{#each $devices as device}
			<div class="shadow stats">
				<div class="stat">
					<div class="stat-title">{device.kind}</div>
					<div class="stat-value">{device.kind}</div>
					<div class="stat-desc">{device.groudpId}</div>
					<div class="stat-desc w-12">{device.deviceId}</div>
				</div>
			</div>
		{/each}

		<div class="modal-action">
			<label for="devices" class="btn btn-error">Close</label>
		</div>
	</div>
</div>
