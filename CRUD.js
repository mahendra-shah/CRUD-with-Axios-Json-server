// CRUD with Axios and Json-server
// data format = {"name": "example", "email": "example@gmail.com", "password": "Password@123", "id": 1}

const axios = require("axios");
const input = require("readline-sync");


const url = "http://localhost:3000/posts";  // url json-server
const Register = async (name, email, pass) => {
  try {
    const res = await axios.get(url+`?email=${email}`); // checking user in database
    if (res.length == 0){
      const dd = {
        name,
        email,
        password: pass,
      };
      const result = await axios.post(url, dd);
      console.log(result.data);
    }else{
      console.log('User already exists');
    }

  } catch (err) {
    console.log(err.message);
  }
};

const Update = async (opt, id, data) => {
  try {
    if (opt === 1) {
      await axios.patch(url + "/" + id, { name: data });
    } else if (opt === 2) {
      await axios.patch(url + "/" + id, { email: data });
    } else if (opt === 3) {
      await axios.patch(url + "/" + id, { password: data });
    }
    console.log("Detail Updated Successfully");
    flag = 0;
  } catch (error) {
    console.log(error.message);
  }
};

const Delete = async (id) => {
  try {
    await axios.delete(url + "/" + id);
    console.log("Account deleted successfully");
  } catch (error) {
    console.log(error.message);
  }
};

const Login = async (id, pass) => {
  try {
    const res = await axios.get(url + "/" + id);
    const d = res.data;
    if (d.id == id) {
      if (d.password == pass) {
        console.log(res.data);
        console.log("Logged-n succesfully");
        const resp = input.questionInt("1 for Update | 2 for Delete : ");
        if (resp === 1) {
          const res1 = input.questionInt(
            "1 for name | 2 for email | 3 for Password : "
          );
          if (res1 === 1) {
            const name = input.question("Enter new Name : ");
            await Update(res1, id, name);
          } else if (res1 === 2) {
            const email = input.question("Enter new Email : ");
            await Update(res1, id, email);
          } else if (res1 === 3) {
            const pass = input.question("Enter new Password : ");
            await Update(res1, id, pass);
          }
        } else if (resp === 2) {
          await Delete(id);
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const runMe = async () => {
  try {
    while (true) {
      console.log("\n 1 for Register \n 2 for Login \n 9 for Exit \n");
      const choice = input.questionInt("Enter your Choice : ");
      if (choice == 9) {
        console.log("🖕");
        break;
      }

      if (choice == 1) {
        const name = input.question("Enter your Name : ");
        const email = input.question("Enter your Email : ");
        let reEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        if (email.match(reEmail)) {
            const pass = input.question('Enter your Password : ')
            let rePass = ("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            if (pass.match(rePass)) {
                await Register(name, email, pass);
            } else { console.log('Please enter a valid password and try again'); }

        } else { console.log('Please enter a valid Email & try again'); }

      } else if (choice == 2) {
        const id = input.question("Enter your ID : ");
        const pass = input.question("Enter your Password : ");
        await Login(id, pass);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
runMe();
