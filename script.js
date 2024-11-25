let submitBtn = document.getElementById("submit-btn");

let generateGif = () => {
    let loader = document.querySelector(".loader");
    loader.style.display = "block"; // Corrected style setting
    document.querySelector(".wrapper").style.display = "none";

    let q = document.getElementById("search-box").value;
    let gifCount = 20;

    let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;

    document.querySelector(".wrapper").innerHTML = ""; // Clear previous results

    fetch(finalURL)
        .then((resp) => resp.json())
        .then((info) => {
            console.log(info.data);

            let gifsData = info.data;
            let loadedCount = 0; // Track loaded GIFs

            gifsData.forEach((gif) => {
                let container = document.createElement("div");
                container.classList.add("container");

                let iframe = document.createElement("img");
                iframe.setAttribute("src", gif.images.downsized_medium.url);

                iframe.onload = () => {
                    loadedCount++;
                    if (loadedCount === gifCount) {
                        loader.style.display = "none"; // Hide loader after all GIFs are loaded
                        document.querySelector(".wrapper").style.display = "grid";
                    }
                };

                container.append(iframe);


                let copyBtn = document.createElement("button");
                copyBtn.innerText = "copy Link";
                copyBtn.onclick = () => {
                    let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
                    navigator.clipboard.writeText(copyLink).then(() => {
                        alert("GIF copied to clipboard");

                    }).catch(() => {
                        alert("GIF copies to clipboard");

                        let hiddenInput = document.createElement("input");
                        hiddenInput.setAttribute("type", "text");
                        document.body.appendChild(hiddenInput);
                        hiddenInput.value = copyLink;

                        hiddenInput.select();

                        document.execCommand("copy");
                        document.body.removeChild(hiddenInput);





                    })

                }
                container.append(copyBtn);
                document.querySelector(".wrapper").append(container); // Fixed typo
            });
        })

};

submitBtn.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);
