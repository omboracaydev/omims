const contributors = [
  "John Doe",
  "Jane Smith",
  "Michael Johnson",
  "Emily Davis",
  "David Brown",
  "Sarah Wilson"
];

const contributorInput = document.getElementById("contributor");
const contributorList = document.getElementById("contributor-list");

contributorInput.addEventListener("input", () => {
  const query = contributorInput.value.toLowerCase();
  contributorList.innerHTML = "";

  if (!query) {
    contributorList.classList.add("hidden");
    return;
  }

  const matches = contributors.filter(name =>
    name.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    contributorList.classList.add("hidden");
    return;
  }

  matches.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    li.className = "p-2 hover:bg-blue-100 cursor-pointer";
    li.addEventListener("click", () => {
      contributorInput.value = name;
      contributorList.classList.add("hidden");
    });
    contributorList.appendChild(li);
  });

  contributorList.classList.remove("hidden");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest("#contributor") && !e.target.closest("#contributor-list")) {
    contributorList.classList.add("hidden");
  }
});
