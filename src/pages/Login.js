import "../assets/login.css";
import escapeHTML from "../utils/escapeHTML";
import { register, login } from "../service/authApi";
import { router } from "../route/router";
import toggleLoading from "../utils/toggleLodaing";
import showToast from "../utils/showToast";

function Login() {
  return `
    <div class="login-container fixed inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('../public/bg_login.jpg');">
      <form id="login-form" class="form display fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 min-w-[400px] rounded-lg p-10 bg-white/10 backdrop-blur-xl border border-white/20">
        <h1 class="text-white font-semibold text-center text-xl mb-6">ĐĂNG NHẬP</h1>
        <div class="form-group">
          <label for="login-email" class="block text-sm text-white mb-1">Email</label>
          <input class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" id="login-email" type="email" name="email" placeholder="Email của bạn" autocomplete="true" autofocus/>
          <p class="form-group-error hidden text-red-400"></p>
        </div>

        <div class="form-group mt-6">
          <label for="login-password" class="block text-sm text-white mb-1">Mật khẩu</label>
          <input class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" id="login-password" type="password"
          name="password" 
          placeholder="Mật khẩu"
          autocomplete="new-password"/>
          <p class="form-group-error hidden text-red-400"></p>
        </div>

        <button class="text-white rounded-xl w-full bg-black py-2 px-3 mt-8 transition-all duration-100 cursor-pointer hover:bg-red-400" type="submit">Đăng nhập</button>

        <div class="mt-10 flex items-center justify-center gap-1">
          <span class="text-gray-500 text-sm">Bạn chưa có tài khoản?</span>
          <button class="register-link text-sm text-white hover:text-red-400 underline font-semibold cursor-pointer">Đăng ký</button>
        </div>
      </form>

      <form id="register-form" class="form fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 min-w-[400px] rounded-lg p-10 bg-white/10 backdrop-blur-xl border border-white/20">
        <h1 class="text-white font-semibold text-center text-xl mb-6">ĐĂNG KÝ</h1>
        <div class="form-group">
          <label for="register-email" class="block text-sm text-white mb-1">Email</label>
          <input class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" id="register-email" type="email" name="email" placeholder="Email của bạn" autocomplete="true" autofocus/>
          <p class="form-group-error hidden text-red-400"></p>
        </div>

        <div class="form-group mt-6">
          <label for="register-username" class="block text-sm text-white mb-1">Tên hiển thị</label>
          <input class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" id="register-username" type="text" name="username" placeholder="Tên hiển thị của bạn" autocomplete="true" autofocus/>
          <p class="form-group-error hidden text-red-400"></p>
        </div>

        <div class="form-group mt-6">
          <label for="register-password" class="block text-sm text-white mb-1">Mật khẩu</label>
          <input class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" id="register-password" type="password"
          name="password" placeholder="Mật khẩu"/>
          <p class="form-group-error hidden text-red-400"></p>
        </div>

        <div class="form-group mt-6">
          <label for="register-comfirm-password" class="block text-sm text-white mb-1">Nhập lại mật khẩu</label>
          <input class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" id="register-comfirm-password" type="password"
          name="confirm-password" placeholder="Nhập lại mật khẩu"/>
          <p class="form-group-error hidden text-red-400"></p>
        </div>

        <button class="text-white rounded-xl w-full bg-black py-2 px-3 mt-8 transition-all duration-100 cursor-pointer hover:bg-red-400" type="submit">Đăng ký</button>

        <div class="mt-10 flex items-center justify-center gap-1">
          <span class="text-gray-500 text-sm">Bạn đã có tài khoản?</span>
          <button class="login-link text-sm text-white hover:text-red-400 underline font-semibold cursor-pointer">Đăng nhập</button>
        </div>
      </form>
    </div>
  `;
}

export default Login;

const $ = document.querySelector.bind(document);

const disPlayForm = () => {
  const loginForm = $("#login-form");
  const registerForm = $("#register-form");
  document.addEventListener("click", (e) => {
    if (e.target.matches("#register-form .login-link")) {
      e.preventDefault();
      loginForm.classList.add("display");
      registerForm.classList.remove("display");
    }

    if (e.target.matches("#login-form .register-link")) {
      e.preventDefault();
      loginForm.classList.remove("display");
      registerForm.classList.add("display");
    }
  });
};

const validateForm = () => {
  const emailLoginInput = $("#login-email");
  const passwordLoginInput = $("#login-password");

  const emailRegisterInput = $("#register-email");
  const usernameInput = $("#register-username");
  const passwordRegisterInput = $("#register-password");
  const confirmationRegisterInput = $("#register-comfirm-password");
  const formLogin = $("#login-form");
  const formRegister = $("#register-form");

  const checkFuncObj = {
    username: [],
    email: [],
    password: [],
    confirmation: [],
  };

  //Hàm lấy ra các element trong form-group,
  // có thể thêm tham số parent thay (".form-group") để mở rộng khả năng tìm kiếm
  const getElementInGroup = (element, selector) => {
    return element.closest(".form-group").querySelector(selector);
  };

  //Hàm sử dụng chung để thông báo
  const validateFunc = (e, input, callback) => {
    let inputEl = input === null ? e.target : input;
    let inputValue = escapeHTML(inputEl.value.trim());
    const conditionObj = callback(inputValue);
    if (!conditionObj.isValid) {
      inputEl.classList.replace("border-gray-400", "border-red-500");
      getElementInGroup(inputEl, ".form-group-error").innerText =
        conditionObj.errorText;
      getElementInGroup(inputEl, ".form-group-error").classList.remove(
        "hidden"
      );
      return false;
    } else {
      inputEl.classList.replace("border-red-500", "border-gray-400");
      getElementInGroup(inputEl, ".form-group-error").classList.add("hidden");
    }
    return true;
  };

  //Check username
  const checkUser = (inputValue) => {
    let isValid = true;
    let errorText;
    if (!inputValue) {
      isValid = false;
      errorText = "Tên hiển thị không được để trống";
    }
    return {
      errorText,
      isValid,
    };
  };
  checkFuncObj.username.push(null, usernameInput);
  checkFuncObj.username.push(checkUser);

  //Check email
  const checkEmail = (inputValue) => {
    let isValid = true;
    let errorText;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!inputValue || !emailRegex.test(inputValue)) {
      isValid = false;
      errorText = "Email không đúng định dạng";
    }
    return {
      isValid,
      errorText,
    };
  };
  checkFuncObj.email.push(emailLoginInput, emailRegisterInput);
  checkFuncObj.email.push(checkEmail);

  //Check password
  const checkPassword = (inputValue) => {
    let isValid = true;
    let errorText;
    let check = true;
    if (!inputValue) {
      isValid = false;
      errorText = "Mật khẩu không được để trống";
      check = false;
    }
    if (check && inputValue.length < 8) {
      isValid = false;
      errorText = "Mật khẩu phải có ít nhất 8 ký tự";
    }

    return {
      isValid,
      errorText,
    };
  };
  checkFuncObj.password.push(passwordLoginInput, passwordRegisterInput);
  checkFuncObj.password.push(checkPassword);

  //Check comfirmation password
  const checkConfirmation = (inputValue) => {
    let isValid = true;
    let errorText;

    if (!inputValue) {
      isValid = false;
      errorText = "Xác nhận mật khẩu không được để trống";
    } else if (inputValue !== passwordRegisterInput.value.trim()) {
      isValid = false;
      errorText = "Mật khẩu không khớp";
    }
    return {
      isValid,
      errorText,
    };
  };
  checkFuncObj.confirmation.push(null, confirmationRegisterInput);
  checkFuncObj.confirmation.push(checkConfirmation);

  //Event register's submit
  usernameInput.addEventListener("input", (e) => {
    validateFunc(e, null, checkFuncObj.username[2]);
  });

  emailRegisterInput.addEventListener("input", (e) => {
    validateFunc(e, null, checkFuncObj.email[2]);
  });

  passwordRegisterInput.addEventListener("input", (e) => {
    validateFunc(e, null, checkFuncObj.password[2]);
    if (confirmationRegisterInput.value)
      validateFunc(
        null,
        confirmationRegisterInput,
        checkFuncObj.confirmation[2]
      ); // Khi password và confirmation đã nhập và match với nhau, nhưng sau đó password thay đổi thì confirmation cũng phải được kiểm tra lại
  });

  confirmationRegisterInput.addEventListener("input", (e) => {
    validateFunc(e, null, checkFuncObj.confirmation[2]);
  });

  // Kiểm tra input login
  emailLoginInput.addEventListener("input", (e) => {
    validateFunc(e, null, checkFuncObj.email[2]);
  });

  passwordLoginInput.addEventListener("input", (e) => {
    validateFunc(e, null, checkFuncObj.password[2]);
  });

  //Sự kiện sunmit của form đăng ký
  formRegister.addEventListener("submit", async (e) => {
    e.preventDefault(); //ngăn chặn hành động mặc định của form
    let isValidForm = true;
    Object.values(checkFuncObj).forEach(([_, input, checkFunc]) => {
      isValidForm
        ? (isValidForm = validateFunc(null, input, checkFunc))
        : validateFunc(null, input, checkFunc);
    });

    if (isValidForm) {
      try {
        toggleLoading(true);
        const data = await register({
          name: usernameInput.value.trim(),
          email: emailRegisterInput.value.trim(),
          password: passwordRegisterInput.value.trim(),
          confirmPassword: confirmationRegisterInput.value.trim(),
        });
        if (data)
          if (data.access_token) {
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            showToast(true, "Đăng ký thành công");
            router.navigate("/");
          }
      } catch (error) {
        if (+error.status === 400) {
          getElementInGroup(emailRegisterInput, ".form-group-error").innerText =
            "Email đã tồn tại";
          getElementInGroup(
            emailRegisterInput,
            ".form-group-error"
          ).classList.remove("hidden");
        } else {
          showToast(false, error.message);
        }
      } finally {
        toggleLoading(false);
      }
    }
  });

  //Sự kiện submit của form đăng nhâp
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault(); //ngăn chặn hành động mặc định của form
    let isValidForm = true;
    Object.values(checkFuncObj)
      .slice(1, 3)
      .forEach(([input, _, checkFunc]) => {
        isValidForm
          ? (isValidForm = validateFunc(null, input, checkFunc))
          : validateFunc(null, input, checkFunc);
      });

    if (isValidForm) {
      try {
        toggleLoading(true);
        const data = await login({
          email: emailLoginInput.value.trim(),
          password: passwordLoginInput.value.trim(),
        });

        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          showToast(true, "Đăng nhập thành công");
          setTimeout(() => {
            router.navigate("/");
          }, 1000);
        }
      } catch (error) {
        if (+error.status === 400) {
          showToast(false, "Email hoặc mật khẩu không đúng! Vui lòng thử lại");
        } else {
          if(error.message === "Network Error") {
            showToast(false, "Mạng không ổn định. Hãy kiểm tra lại kết nối mạng!");
          } 
        }
      } finally {
        toggleLoading(false);
      }
    }
  });
};

export const afterRenderLogin = () => {
  toggleLoading(true);
  $(".sidebar-item.active")?.classList.remove("active");
  $(".sidebar-item.sidebar-slide-nav-item.active")?.classList.remove("active");
  setTimeout(() => {
    toggleLoading(false);
  }, 1000);
  disPlayForm();
  validateForm();
};
