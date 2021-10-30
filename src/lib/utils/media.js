export async function openCamera(deviceId, minWidth = 1280, minHeight = 720) {
	const constraints = {
		audio: false,
		video: {
			deviceId: deviceId,
			width: minWidth,
			height: minHeight
		}
	};

	return await navigator.mediaDevices.getUserMedia(constraints);
}

export async function getConnectedDevices(deviceKind = '') {
	const devices = await navigator.mediaDevices.enumerateDevices();

	if (deviceKind) {
		return devices.filter((device) => device.kind === deviceKind);
	}

	return devices;
}

export async function openMediaDevices(constraints) {
	return await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
}
