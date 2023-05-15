window.onload = () => {
  console.log(document.querySelector(".btn-edit"));
  console.log(document.querySelector("#profile-form"));

  document.querySelector(".btn-edit").addEventListener("click", () => {
      document.getElementById("personalInfoFields").removeAttribute("disabled");
  });

  document.querySelector("#profile-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.querySelector("#usernameInput").value;
      const firstname = document.querySelector("#firstnameInput").value;
      const lastname = document.querySelector("#lastnameInput").value;
      const gender = document.querySelector("#genderInput").value; // Move it here
      const age = document.querySelector("#ageInput").value;
      const job = document.querySelector("#jobInput").value;
      const email = document.querySelector("#emailInput").value;

      const payload = {
          username,
          firstname,
          lastname,
          gender,
          age,
          job,
          email
      };

      fetch("/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
      })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Error occurred while saving the profile");
              }
              return response.json();
          })
          .then((updatedUser) => {
            document.getElementById("usernameInput").value = updatedUser.username;
            document.getElementById("firstnameInput").value = updatedUser.firstname;
            document.getElementById("lastnameInput").value = updatedUser.lastname;
            document.getElementById("genderInput").value = updatedUser.gender;
            document.getElementById("ageInput").value = updatedUser.age;
            document.getElementById("jobInput").value = updatedUser.job;
            document.getElementById("emailInput").value = updatedUser.email;
            
            document.getElementById("personalInfoFields").setAttribute("disabled", "disabled");

          })
          .catch((err) => console.error(err));
  });
};
