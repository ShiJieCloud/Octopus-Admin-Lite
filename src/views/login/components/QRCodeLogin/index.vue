<!--https://vueuse.nodejs.cn/integrations/useQRCode-->
<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { onMounted, onUnmounted, ref } from 'vue'

const { setLoginMode } = useUserStore()

const text = ref('https://zsjie.blog.csdn.net/?type=blog') // 初始二维码内容
const qrCodeUrl = useQRCode(text, {
  errorCorrectionLevel: 'M',
  typeNumber: 40,
  margin: 1,
  width: 200,
  height: 200
})

let intervalId = null

onMounted(() => {
  intervalId = setInterval(() => {
    text.value = `https://zsjie.blog.csdn.net/?type=blog?timestamp=${new Date().getTime()}` // 每5秒更新内容
  }, 5000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId) // 清除定时器以防止内存泄漏
  }
})
</script>

<template>
  <div>
    <el-form
      ref="ruleFormRef"
      label-width="auto"
      status-icon
      size="large"
    >
      <el-form-item prop="QRCode">
        <div class="w-full flex justify-center items-center">
          <img v-if="text" :src="qrCodeUrl" alt="QR Code">
        </div>
        <el-divider><span class="text-md text-gray-500 select-none">请使用微信扫码登录</span></el-divider>
      </el-form-item>
      <el-form-item>
        <el-button class="w-full" plain size="default" @click="setLoginMode('classic')">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="postcss">

</style>