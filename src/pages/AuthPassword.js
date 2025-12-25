import escapeHTML from "../utils/escapeHTML";
import { getProfile, updateProfile } from "../service/authApi";
import { updatePassword } from "../service/authApi";
import showToast from "../utils/showToast";
import toggleLoading from "../utils/toggleLodaing";
import { router } from "../route/router";
import handleShowPassword from "../utils/handleShowPassword";

function AuthPassword() {
  return `
   <div class="login-container fixed inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('../public/bg_login.jpg');">
    <form id="update-password-form" class="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 min-w-[400px] rounded-lg p-10 bg-white/10 backdrop-blur-xl border border-white/20">
      <h2 class="text-white font-semibold text-center text-xl mb-6">CẬP NHẬT THÔNG TIN</h2>
      <div class="form-group group-current-password">
          <label for="current-password" class="block text-sm text-white mb-1">Mật khẩu hiện tại</label>
          <div class="relative">
            <input id="current-password" type="password" name="current-password" value="" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" autocomplete="new-password">
            <div class="show-password absolute top-1/2 -translate-y-1/2 right-[10px]"><i class="fa-solid fa-eye text-black/80 cursor-pointer"></i></div>
            <div class="hide-password hidden absolute top-1/2 -translate-y-1/2 right-[10px]"><i class="fa-solid fa-eye-slash"></i></div>
          </div>
          <p class="form-group-error text-red-400 hidden"></p>
      </div>
      <div class="form-group mt-6 group-new-password">
          <label for="new-password" class="block text-sm text-white mb-1">Mật khẩu mới</label>
          <div class="relative">
            <input id="new-password" type="password" name="new-password" value="" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" placeholder="Tối thiểu 8 ký tự...">
            <div class="show-password absolute top-1/2 -translate-y-1/2 right-[10px]"><i class="fa-solid fa-eye text-black/80 cursor-pointer"></i></div>
            <div class="hide-password hidden absolute top-1/2 -translate-y-1/2 right-[10px]"><i class="fa-solid fa-eye-slash"></i></div>
          </div>
          <p class="form-group-error text-red-400 hidden"></p>
      </div>
      <div class="form-group mt-6 group-confirm-password">
          <label for="confirm-password" class="block text-sm text-white mb-1">Xác nhận mật khẩu mới</label>
          <div class="relative">
            <input id="confirm-password" type="password" name="confirm-password" value="" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800">
            <div class="show-password absolute top-1/2 -translate-y-1/2 right-[10px]"><i class="fa-solid fa-eye text-black/80 cursor-pointer"></i></div>
            <div class="hide-password hidden absolute top-1/2 -translate-y-1/2 right-[10px]"><i class="fa-solid fa-eye-slash"></i></div>
          </div>
          <p class="form-group-error text-red-400 hidden"></p>
      </div>
      <button type="submit" class="block w-full mt-8 px-4 py-2 bg-black/80 text-white rounded-xl hover:bg-red-400 transition cursor-pointer">
          Cập nhật
      </button>
    </form>
  </div>
  `;
}

export default AuthPassword;

const $ = document.querySelector.bind(document);
const updatePasswordUser = async () => {
  const form = $("#update-password-form");
  const currentPasswordInput = $("#current-password");
  const newPasswordInput = $("#new-password");
  const confirmNewPasswordInput = $("#confirm-password");

  const checkFuncObj = {
    currentPassword: [],
    newPassword: [],
    confirmPassword: [],
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

  const checkNewPassword = (inputValue) => {
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

    if (check && currentPasswordInput.value.trim() === inputValue) {
      isValid = false;
      errorText = "Mật khẩu mới phải khác mật khẩu hiện tại";
    }
    return {
      isValid,
      errorText,
    };
  };
  checkFuncObj.currentPassword.push(currentPasswordInput);
  checkFuncObj.currentPassword.push(checkPassword);

  checkFuncObj.newPassword.push(newPasswordInput);
  checkFuncObj.newPassword.push(checkNewPassword);

  //Check comfirmation password
  const checkConfirmation = (inputValue) => {
    let isValid = true;
    let errorText;

    if (!inputValue) {
      isValid = false;
      errorText = "Xác nhận mật khẩu không được để trống";
    } else if (inputValue !== newPasswordInput.value.trim()) {
      isValid = false;
      errorText = "Mật khẩu không khớp";
    }
    return {
      isValid,
      errorText,
    };
  };
  checkFuncObj.confirmPassword.push(confirmNewPasswordInput);
  checkFuncObj.confirmPassword.push(checkConfirmation);

  currentPasswordInput.addEventListener("input", (e) => {
    validateFunc(e, null, checkFuncObj.currentPassword[1]);
  });

  newPasswordInput.addEventListener("input", (e) => {
    validateFunc(e, null, checkFuncObj.newPassword[1]);
    if (confirmNewPasswordInput.value)
      validateFunc(
        null,
        confirmNewPasswordInput,
        checkFuncObj.confirmPassword[1]
      ); // Khi password và confirmation đã nhập và match với nhau, nhưng sau đó password thay đổi thì confirmation cũng phải được kiểm tra lại
  });

  confirmNewPasswordInput.addEventListener("input", (e) => {
    validateFunc(e, null, checkFuncObj.confirmPassword[1]);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); //ngăn chặn hành động mặc định của form
    let isValidForm = true;
    Object.values(checkFuncObj).forEach(([input, checkFunc]) => {
      isValidForm
        ? (isValidForm = validateFunc(null, input, checkFunc))
        : validateFunc(null, input, checkFunc);
    });

    if (isValidForm) {
      try {
        toggleLoading(true);
        const data = await updatePassword({
          oldPassword: currentPasswordInput.value.trim(),
          password: newPasswordInput.value.trim(),
          confirmPassword: confirmNewPasswordInput.value.trim(),
        });
        showToast(true, "Cập nhật mật khẩu thành công");
        router.navigate("/");
      } catch (error) {
        if (+error.status === 400) {
          showToast(false, "Mật khẩu hiện tại không chính xác");
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

const showPassword = () => {
  handleShowPassword(".group-current-password");
  handleShowPassword(".group-new-password");
  handleShowPassword(".group-confirm-password");
}

export const afterRenderAuthPassword = () => {
  $(".sidebar-item.active")?.classList.remove("active");
  $(".sidebar-item.sidebar-slide-nav-item.active")?.classList.remove("active");
  updatePasswordUser();
  showPassword();
};
