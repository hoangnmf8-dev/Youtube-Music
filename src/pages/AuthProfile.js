import escapeHTML from "../utils/escapeHTML";
import { getProfile, updateProfile } from "../service/auth";
import showToast from "../utils/show_toast";
import toggleLoading from "../utils/toggle_lodaing";
import { router } from "../route/router";

function AuthProfile() {
  return `
   <div class="login-container fixed inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('../public/bg_login.jpg');">
    <form id="update-profile-form" class="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 min-w-[400px] rounded-lg p-10 bg-white/10 backdrop-blur-xl border border-white/20">
      <h2 class="text-white font-semibold text-center text-xl mb-6">CẬP NHẬT THÔNG TIN</h2>
      <div class="form-group">
          <label for="name" class="block text-sm text-white mb-1">Tên hiển thị</label>
          <input id="name" name="name" value="" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800">
          <p class="form-group-error text-red-400 hidden"></p>
      </div>
      <div class="form-group mt-6">
          <label for="email" class="block text-sm text-white mb-1">Email</label>
          <input id="email" name="email" value="" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" type="email">
          <p class="form-group-error text-red-400 hidden"></p>
      </div>
      <button type="submit" class="block w-full mt-8 px-4 py-2 bg-black/80 text-white rounded-xl hover:bg-red-400 transition cursor-pointer">
          Cập nhật
      </button>
    </form>
  </div>
  `;
}

export default AuthProfile;

const $ = document.querySelector.bind(document);
const upadteUser = async () => {
  try {
    const form = $("#update-profile-form");
    const usernameInput = $("#update-profile-form #name");
    const emailInput = $("#update-profile-form #email");
    const dataProfile = await getProfile();
    usernameInput.setAttribute("value", dataProfile.name);
    emailInput.setAttribute("value", dataProfile.email);

    const checkFuncObj = {
      username: [],
      email: [],
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
    checkFuncObj.username.push(usernameInput);
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
    checkFuncObj.email.push(emailInput);
    checkFuncObj.email.push(checkEmail);
    usernameInput.addEventListener("input", (e) => {
      validateFunc(e, null, checkFuncObj.username[1]);
    });

    emailInput.addEventListener("input", (e) => {
      validateFunc(e, null, checkFuncObj.email[1]);
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
          const data = await updateProfile({
            name: usernameInput.value.trim(),
            email: emailInput.value.trim(),
          });
          showToast(true, "Cập nhật thông tin thành công");
            router.navigate("/");
        } catch (error) {
          showToast(false, error.message);
        } finally {
          toggleLoading(false);
        }
      }
    });
  } catch (error) {
    showToast(false, error.message);
  }
};

export const afterRenderAuthProfile = () => {
  upadteUser();
};
