export function formatSeconds(seconds) {  
	const minutes = Math.floor(seconds / 60);  
	const remainingSeconds = seconds % 60;  

	// Pad minutes and seconds with leading zeros if less than 10  
	const formattedMinutes = String(minutes).padStart(2, '0');  
	const formattedSeconds = String(remainingSeconds).padStart(2, '0');  

	return `${formattedMinutes}:${formattedSeconds}`;  
} 