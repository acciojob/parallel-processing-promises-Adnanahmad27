//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
function promiseCreator(url){
	return new Promise((res , rej) => {
		let img = new Image();
		img.onload = function (){
			res(img);
		};
		img.onerror = function(){
			rej(new Error(`Failed to load image's URL: ${url}`));
		}
		img.src = url;
	})
}
btn.addEventListener('click' , (e)=>{
	const promises = images.map(ele => promiseCreator(ele.url));
	Promise.all(promises)
		.then( images => {
			images.forEach( (image) => {
				output.appendChild(image);
			})
		}).catch(e => {
			console.error(e);
		});
});
