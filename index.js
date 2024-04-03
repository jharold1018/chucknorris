// Fetch Categories for UI
async function fetchCategories() {
    const response = await fetch("https://api.chucknorris.io/jokes/categories")

    const data = await response.json()
    return data
}

// fetch single joke function
async function fetchJoke(currentCategory) {
    const response = await fetch(
        `https://api.chucknorris.io/jokes/random?category=${currentCategory}`
    )

    const data = await response.json()
    return data.value
}

let currentCategory = "dev"

// load jokes onLoad
window.onload = async function () {
    const bodyRadioWrapper = document.getElementById("body-radio-wrapper")

    data = await fetchCategories()

    Array.from(data).forEach((category) => {
        const radio = document.createElement("input")
        radio.type = "radio"
        radio.name = "category"
        radio.value = category
        radio.id = category
        radio.className = "body-radio-button"
        radio.addEventListener("click", () => {
            currentCategory = event.target.id
        })
        bodyRadioWrapper.appendChild(radio)

        const label = document.createElement("label")
        label.htmlFor = category
        label.innerHTML = category
        bodyRadioWrapper.appendChild(label)
    })
}

// fetch joke
const jokeButton = document.getElementById("joke-button")
jokeButton.addEventListener("click", async function () {
    const value = await fetchJoke(currentCategory)
    const jokeText = document.getElementById("body-joke-area")
    jokeText.innerHTML = ""
    jokeText.innerHTML = value
})
