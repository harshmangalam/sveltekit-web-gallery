export default function useVideo(element, stream) {
	if (stream) {
		element.srcObject = stream;
	}
	return {
		update(updatedStream) {
			element.srcObject = updatedStream;
		}
	};
}
