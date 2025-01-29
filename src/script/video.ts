const BASEURL = "https://files.colormatic.org/";

export function getParam(paramName: string) {
	var params = new URLSearchParams(window.location.search);
	let t_param = params.get(paramName);
	return t_param ? t_param : ""; // Return empty string if null
}

async function getJSON(url: string) {
	const response = await fetch(url);
	if (!response.ok) throw new Error(response.statusText);

	const data = response.json();
	return data;
}

export function getVideo(cname: string, vname: string) {
	var videoplayer = document.getElementById("videoplayer") as HTMLElement;
	var videotitle = document.getElementById("videotitle") as HTMLElement;
	var videodescription = document.getElementById(
		"videodescription",
	) as HTMLElement;
	var videodownload = document.getElementById("videodownload") as HTMLElement;
	var sourcedownload = document.getElementById(
		"sourcedownload",
	) as HTMLElement;
	getJSON(BASEURL + cname + "/videos/data/" + vname + ".json")
		.then((data) => {
			let videoURL =
				BASEURL +
				cname +
				"/videos/raw/" +
				data.video_file +
				"." +
				data.video_format;
			videoplayer.setAttribute(
				"poster",
				BASEURL + cname + "/videos/thumbnail/" + data.thumbnail,
			);
			var videosource = document.createElement("source");
			videosource.setAttribute("src", videoURL);
			videosource.setAttribute("type", "video/" + data.video_format);
			videoplayer.appendChild(videosource);

			document.title = data.title;
			videotitle.innerText = data.title;
			data.description.forEach((iter: number) => {
				// TODO: Detect if one of these lines contains a link and if so, make it a link
				videodescription.appendChild(
					document.createTextNode(iter.toString()),
				);
				videodescription.appendChild(document.createElement("br"));
			});

			videodownload.setAttribute(
				"href",
				BASEURL +
					cname +
					"/videos/raw/" +
					data.video_file +
					"." +
					data.video_format,
			);
			videodownload.setAttribute(
				"download",
				data.video_file + "." + data.video_format,
			);
			sourcedownload.setAttribute(
				"href",
				BASEURL +
					cname +
					"/videos/source/" +
					data.source_file +
					"." +
					data.source_format,
			);
			sourcedownload.setAttribute(
				"download",
				data.source_file + "." + data.source_format,
			);
		})
		.catch((error) => {
			videotitle.innerText = "Failed to load video.";
			console.error(error);
		});
}
