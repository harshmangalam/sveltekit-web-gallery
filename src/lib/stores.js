import { writable } from 'svelte/store';

function createDeviceStore() {
	return writable([]);
}

function createStream() {
	return writable(null);
}

function createUserVideo() {
	return writable(null);
}

function createImages() {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
		setImages(images) {
			set(images);
		},
		addImage(image) {
			update((images) => [...images, image]);
		}
	};
}


export const images = createImages();
export const userVideo = createUserVideo();
export const userStream = createStream();
export const devices = createDeviceStore();
