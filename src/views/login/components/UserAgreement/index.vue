<script setup lang="ts">

import { useUserStore } from '@/stores/modules/user'

const { loginConfig, toggleVisibleUserAgreement } = useUserStore()

</script>

<template>
  <el-dialog
    v-model="loginConfig.isVisibleUserAgreement"
    title="用户注册协议"
    fullscreen
    :before-close="toggleVisibleUserAgreement"
  >

    <p>欢迎您注册成为本网站的用户。请在注册前仔细阅读以下服务条款和隐私政策（以下简称“协议”）。
      注册并使用本网站服务即表示您同意接受本协议的所有条款。如果您不同意本协议的任何内容，请您停止注册和使用本网站的服务。</p>

    <el-collapse accordion class="mt-3">
      <el-collapse-item title="1. 用户注册申请">
        <ul>
          <li>1.1 您在使用本网站服务前，需要完成注册并填写相关信息，包括但不限于用户名、密码、电子邮件地址等个人身份信息。</li>
          <li>1.2 您应保证所提供的信息真实、准确、完整，并承担由此产生的任何责任。</li>
          <li>1.3 如果您提供的信息有任何变动，您应及时更新并保证准确性。</li>
        </ul>
      </el-collapse-item>

      <el-collapse-item title="2. 用户账号和密码管理">
        <ul>
          <li>2.1 您成功注册后，将获得一个您自行设置的用户名和密码。</li>
          <li>2.2 您需要妥善保管账号和密码，不得将其提供给他人使用。</li>
          <li>2.3 如发现您的账号被未经授权的第三方使用，您应立即通知本网站，并采取相应措施以防止损失。</li>
        </ul>
      </el-collapse-item>

      <el-collapse-item title="3. 用户行为规范">
        <ul>
          <li>3.1 您在使用本网站服务时，应遵守以下规定：
            <ul style="padding-left: 20px;">
              <li>不得以任何形式侵犯他人的合法权益，包括但不限于知识产权、隐私权等；</li>
              <li>不得上传、发布、传播任何违法、淫秽、暴力或其他不适宜的内容；</li>
              <li>不得利用本网站进行任何非法活动，包括但不限于诈骗、恶意攻击等。</li>
            </ul>
          </li>
        </ul>

      </el-collapse-item>

      <el-collapse-item title="4. 服务的变更与终止">
        <ul>
          <li>4.1 本网站有权根据实际情况随时修改或更新服务内容、服务条款，修改后将通过网站公告或其他适当方式通知用户。</li>
          <li>4.2 本网站有权在任何时候终止或暂停提供服务，且无需对用户或任何第三方承担责任。</li>
        </ul>
      </el-collapse-item>

      <el-collapse-item title="5. 免责声明">
        <ul>
          <li>5.1 本网站不对因不可抗力或其他非本网站原因导致的服务中断、数据丢失等问题承担责任。</li>
          <li>5.2 本网站不保证服务的连续性、准确性或适用性，用户应自行承担使用本网站服务的风险。</li>
        </ul>
      </el-collapse-item>

      <el-collapse-item title="6. 知识产权">
        <ul>
          <li>6.1 本网站及其提供的所有内容（包括但不限于文字、图片、软件、音视频等）均为本网站或相关权利人所有，受法律保护。</li>
          <li>6.2 用户不得未经授权复制、修改、传播或以其他方式使用本网站的知识产权内容。</li>
        </ul>
      </el-collapse-item>

      <el-collapse-item title="7. 适用法律与争议解决">
        <ul>
          <li>7.1 本协议的订立、执行和解释均适用中华人民共和国法律。</li>
          <li>7.2 因本协议引发的或与本协议有关的任何争议，应提交本网站所在地人民法院管辖。</li>
        </ul>
      </el-collapse-item>
    </el-collapse>

  </el-dialog>
</template>

<style scoped>
.el-dialog {
  padding: 20px;
}

.el-card {
  padding: 20px;
}

.el-collapse-item {
  margin-bottom: 10px;
}
</style>
