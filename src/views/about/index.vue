<script setup lang="ts">

import { onBeforeUnmount, onMounted, ref } from 'vue'

const { pkg } = __APP_INFO__
const { dependencies, devDependencies, version } = pkg

const columns = ref(3) // 默认列数

// 函数：根据窗口宽度更新列数
const updateColumns = () => {
  if (window.innerWidth < 768) {
    columns.value = 1 // 小屏幕时列数设置为1
  } else if (window.innerWidth < 1024) {
    columns.value = 2 // 中等屏幕时列数设置为2
  } else {
    columns.value = 3 // 大屏幕时列数设置为3
  }
}

// 组件挂载时添加事件监听
onMounted(() => {
  window.addEventListener('resize', updateColumns)
  updateColumns() // 初始化列数
})

// 组件卸载时移除事件监听
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateColumns)
})
</script>

<template>
  <div class="w-full h-full">
    <div class="space-y-3 pb-3">

      <!-- 作者信息 -->
      <div class="info-container">
        <div>
          <el-descriptions title="作者信息" :column="1" border>
            <el-descriptions-item label="作者">赵士杰</el-descriptions-item>
            <el-descriptions-item label="博客主页">
              <el-link href="https://zsjie.blog.csdn.net/" target="_blank" type="primary">@赵士杰<sup>CSDN</sup></el-link>
            </el-descriptions-item>
            <el-descriptions-item label="作者简介">少年若有凌云志,一遇风云便化龙</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>

      <!-- 项目简介 -->
      <div class="info-container">
        <div>
          <el-descriptions title="项目简介" :column="1" border>
            <el-descriptions-item label="项目">Octopus-Admin-Lite</el-descriptions-item>
            <el-descriptions-item label="项目简介">这是一个基于Vue3、TypeScript、Vite和Element Plus的前端项目模板。</el-descriptions-item>
            <el-descriptions-item label="项目技术栈">Vue3、TypeScript、Vite和Element Plus</el-descriptions-item>
          </el-descriptions>
          </div>
      </div>

      <!-- 项目信息 -->
      <div class="info-container">
        <div>
          <el-descriptions title="项目信息" :column="Math.min(2,columns)" border>
            <el-descriptions-item>
              <template #label>
                <div>版本号</div>
              </template>
              <el-tag>{{ version }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div>发布时间</div>
              </template>
              <el-tag>2024-03-25 07:27:46</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div>GitCode</div>
              </template>
              <el-link href="https://gitcode.com/qq_20185737/Octopus-Admin-Lite" target="_blank" type="primary">Octopus-Admin-Lite</el-link>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div>Gitee</div>
              </template>
              暂无
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div>Github</div>
              </template>
              <el-link href="https://github.com/ShiJieCloud/Octopus-Admin-Lite" target="_blank" type="primary">Octopus-Admin-Lite</el-link>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div>文档地址</div>
              </template>
              文档地址
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div>预览地址</div>
              </template>
              <el-link href="https://shijiecloud.github.io/Octopus-Admin-Lite/" target="_blank" type="primary">预览地址（需上网）</el-link>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>

      <!-- 生产环境依赖 -->
      <div class="info-container">
        <el-descriptions title="生产环境依赖" :column="columns" border>
          <el-descriptions-item v-for="(item, key) in dependencies" :key="key" label-class-name="font-bold">
            <template #label>
              <div>{{ key }}</div>
            </template>
            {{ item }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <!-- 开发环境依赖 -->
      <div class="info-container">
        <el-descriptions title="开发环境依赖" :column="columns" border>
          <el-descriptions-item v-for="(item, key) in devDependencies" :key="key">
            <template #label>
              <div>{{ key }}</div>
            </template>
            {{ item }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.info-container{
  @apply p-3 rounded space-y-3;
 background-color: var(--el-bg-color);
}

</style>
