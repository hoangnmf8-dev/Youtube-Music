function Login() {
  return `
    <div class="fixed hidden inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('../public/bg_login.jpg');">
      <form id="login-form" class="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 min-w-[400px] rounded-lg p-10 bg-white/10 backdrop-blur-xl border border-white/20">
        <h1 class="text-white font-semibold text-center text-xl mb-6">ĐĂNG NHẬP</h1>
        <div>
          <label for="login-email" class="block text-sm text-white mb-1">Email</label>
          <input class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" id="login-email" type="email" name="email" placeholder="Email của bạn" autocomplete="true" autofocus/>
        </div>

        <div class="mt-6">
          <label for="login-password" class="block text-sm text-white mb-1">Mật khẩu</label>
          <input class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" id="login-password" type="password"
          name="password" 
          placeholder="Mật khẩu"
          autocomplete="new-password"/>
        </div>

        <button class="text-white rounded-xl w-full bg-black py-2 px-3 mt-8 transition-all duration-100 cursor-pointer hover:bg-red-400" type="submit">Đăng nhập</button>

        <div class="mt-10 flex items-center justify-center gap-1">
          <span class="text-gray-500 text-sm">Bạn chưa có tài khoản?</span>
          <button class="text-sm text-white hover:text-red-400 underline font-semibold cursor-pointer">Đăng ký</button>
        </div>
      </form>
    </div> 

    <div class="fixed inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('../public/bg_login.jpg');">
      <form id="register-form" class="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 min-w-[400px] rounded-lg p-10 bg-white/10 backdrop-blur-xl border border-white/20">
        <h1 class="text-white font-semibold text-center text-xl mb-6">ĐĂNG KÝ</h1>
        <div>
          <label for="register-email" class="block text-sm text-white mb-1">Email</label>
          <input class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" id="register-email" type="email" name="email" placeholder="Email của bạn" autocomplete="true" autofocus/>
        </div>

        <div class="mt-6">
          <label for="register-username" class="block text-sm text-white mb-1">Tên hiển thị</label>
          <input class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" id="register-username" type="text" name="username" placeholder="Tên hiển thị của bạn" autocomplete="true" autofocus/>
        </div>

        <div class="mt-6">
          <label for="register-password" class="block text-sm text-white mb-1">Mật khẩu</label>
          <input class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" id="register-password" type="password"
          name="password" placeholder="Mật khẩu"/>
        </div>

        <div class="mt-6">
          <label for="register-comfirm-password" class="block text-sm text-white mb-1">Nhập lại mật khẩu</label>
          <input class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" id="register-comfirm-password" type="password"
          name="confirm-password" placeholder="Nhập lại mật khẩu"/>
        </div>

        <button class="text-white rounded-xl w-full bg-black py-2 px-3 mt-8 transition-all duration-100 cursor-pointer hover:bg-red-400" type="submit">Đăng ký</button>

        <div class="mt-10 flex items-center justify-center gap-1">
          <span class="text-gray-500 text-sm">Bạn đã có tài khoản?</span>
          <button class="text-sm text-white hover:text-red-400 underline font-semibold cursor-pointer">Đăng nhập</button>
        </div>
      </form>
    </div>
  `
}

export default Login;

