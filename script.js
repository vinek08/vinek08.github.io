const filterButtons = document.querySelectorAll("[data-filter]");
const projects = document.querySelectorAll("[data-tags]");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const tag = button.dataset.filter;

        filterButtons.forEach((other) => {
            other.setAttribute("aria-pressed", String(other === button));
        });

        projects.forEach((project) => {
            const projectTags = project.dataset.tags.split(" ");
            project.hidden = tag !== "all" && !projectTags.includes(tag);
        });
    });
});

async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
    }

    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);

    if (!ok) {
        throw new Error("Copy failed");
    }
}

document.querySelectorAll("[data-copy]").forEach((button) => {
    const source = document.querySelector(button.dataset.copy);
    const status = document.querySelector(button.dataset.status);

    if (!source || !status) {
        return;
    }

    let timer;

    button.addEventListener("click", async () => {
        try {
            await copyText(source.textContent.trim());
            status.textContent = "Copied!";
        } catch (error) {
            status.textContent = "Could not copy. Please copy it manually.";
        }

        clearTimeout(timer);
        timer = setTimeout(() => {
            status.textContent = "";
        }, 3000);
    });
});