<template>
  <a-col class="banner">
    <a-col :span="8">
      <a-space style="margin-bottom: 10px">
        <a-button type="primary" :loading="previewing" @click="handlePreview">{{
          previewing ? '二维码生成中' : '预览'
        }}</a-button>
        <a-button type="outline" :loading="uploading" @click="handleUpload">{{
          uploading ? '代码上传中' : '上传'
        }}</a-button>
      </a-space>
    </a-col>
    <a-image width="200" height="200" :src="qrcode">
      <template #loader>
        <a-spin />
      </template>
    </a-image>
    <a-modal
      :visible="previewVisible"
      title="预览小程序"
      :ok-text="previewOkText"
      :cancel-text="previewCancelText"
      :ok-loading="previewOkLoading"
      :on-before-ok="handleBeforeOk"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form
        v-if="step === 'firstStep'"
        ref="formRef"
        size="medium"
        :model="previewForm"
      >
        <a-form-item field="branch" label="分支">
          <a-select
            v-model="previewForm.branch"
            placeholder="请选择分支"
            allow-clear
          >
            <a-option v-for="option in branchOptions" :key="option">{{
              option
            }}</a-option>
          </a-select>
        </a-form-item>
      </a-form>
      <a-form
        v-if="step === 'middle'"
        ref="formRef"
        :label-col-props="{ span: 8 }"
        :wrapper-col-props="{ span: 16 }"
        size="medium"
        :model="previewConfigForm"
      >
        <a-form-item field="branch" label="本次预览的appid">
          <a-input
            v-model="previewConfigForm.appId"
            placeholder="可根据不同appid来预览对应主体"
          />
        </a-form-item>
        <a-form-item field="page" label="启动页面">
          <a-select
            v-model="previewConfigForm.page"
            placeholder="请选择启动页面"
            allow-clear
          >
            <a-option v-for="option in defaultPageOptions" :key="option">{{
              option
            }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="branch" label="本次预览的页面参数">
          <a-input
            v-model="previewConfigForm.pageQuery"
            placeholder="可在当前页面的 onLoad 中取得, 例如: name=vendor&color=black"
          />
        </a-form-item>
        <a-form-item field="branch" label="本次预览的全局参数">
          <a-input
            v-model="previewConfigForm.query"
            placeholder="可在 app.js 的 onLaunch 中取得, 例如: name=vendor&color=black"
          />
        </a-form-item>
        <a-form-item field="scene" label="场景值">
          <a-select
            v-model="previewConfigForm.scene"
            placeholder="本次预览的场景值"
            allow-clear
          >
            <a-option v-for="option in sceneOptions" :key="option">{{
              option
            }}</a-option>
          </a-select>
        </a-form-item>
      </a-form>
      <a-form
        v-if="step === 'lastStep'"
        ref="formRef"
        size="medium"
        :model="dynamicConfigForm"
      >
        <a-form-item
          v-for="(value, key) in dynamicConfigForm"
          :key="key"
          :field="key"
          :label="key"
        >
          <a-input
            v-model="dynamicConfigForm[key]"
            :placeholder="`请输入${key}`"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model:visible="uploadVisible"
      title="上传小程序"
      @ok="handleUploadOk"
      @cancel="handleUploadCancel"
    >
      <a-form ref="formRef" size="medium" :model="uploadForm">
        <a-form-item field="section" label="分支">
          <a-select
            v-model="uploadForm.branch"
            placeholder="请选择分支"
            allow-clear
          >
            <a-option v-for="option in branchOptions" :key="option">{{
              option
            }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="branch" label="版本号">
          <a-input v-model="uploadForm.version" placeholder="请输入版本号." />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-divider class="panel-border" />
  </a-col>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';

  import {
    getBranch,
    getBranchInfo,
    getQrcode,
    uploadBundle,
  } from '@/api/list';

  const qrcode = ref<string>('');
  const previewing = ref(false);
  const uploading = ref(false);
  const previewOkLoading = ref(false);
  const previewForm = ref({
    branch: '',
  });

  const uploadForm = ref({
    branch: '',
    version: '',
  });

  const previewConfigForm = ref({
    appId: '',
    page: '/pages/index/index',
    pageQuery: '',
    query: '',
    scene: '',
  });
  const dynamicConfigForm = ref({});

  const step = ref<'firstStep' | 'middle' | 'lastStep'>('firstStep');
  const previewOkText = computed(() =>
    step.value === 'lastStep' ? '确认' : '下一步'
  );

  const previewCancelText = computed(() =>
    step.value === 'firstStep' ? '取消' : '上一步'
  );

  const branchOptions = ref([]);
  const defaultPageOptions = ref([]);

  const sceneOptions = ref([
    'ch_appcenter',
    'ch_tinycenter',
    'ch_appcollect',
    'ch_alipaysearch',
    'ch_share',
    'ch_scan',
    'ch_messageservice',
    'ch_life',
    'ch_desktop',
    'ch_othertinyapp',
    'ch_backfromtinyapp',
    'ch_tinylongpress',
    'ch_cityservice',
    'ch_zhima',
    'ch_carservice',
    'ch_medicalservice',
    'ch_college',
    'ch_school',
    'ch_sharebike',
    'ch_insurance',
    'ch_ttyl',
    'ch_membership',
    'ch_outerUrl',
  ]);
  const previewVisible = ref(false);
  const uploadVisible = ref(false);

  const handlePreview = () => {
    previewVisible.value = true;
  };

  const handleUpload = () => {
    uploadVisible.value = true;
  };
  const handleUploadOk = async () => {
    uploadVisible.value = false;
    uploading.value = true;
    const { data } = await uploadBundle({
      branch: uploadForm.value.branch,
      version: uploadForm.value.version,
      repo: 'uni-flower-mall',
    });
    uploading.value = false;
    qrcode.value = data;
  };
  const handleUploadCancel = () => {
    previewVisible.value = false;
  };

  const handleBeforeOk = async () => {
    if (step.value === 'lastStep') {
      return true;
    }
    if (step.value === 'middle') {
      step.value = 'lastStep';
    }
    if (step.value === 'firstStep') {
      try {
        previewOkLoading.value = true;
        const { data } = await getBranchInfo({
          branch: previewForm.value.branch,
          repo: 'uni-flower-mall',
          platform: 'alipay',
        });
        console.log(data, 'asdasda');
        previewConfigForm.value.appId = data.appid;
        dynamicConfigForm.value = data.pageConfig;
        defaultPageOptions.value = data.pageList;
        step.value = 'middle';
        console.log(data, 'data');
      } catch (err) {
        console.log(err, 'err');
      } finally {
        previewOkLoading.value = false;
      }
    }
    return false;
  };

  const handleOk = async () => {
    try {
      previewVisible.value = false;
      previewing.value = true;
      const { data } = await getQrcode({
        fileValue: dynamicConfigForm.value,
        previewValue: previewConfigForm.value,
        platform: 'alipay',
      });
      qrcode.value = data;
      console.log(data, 'resss');
    } catch (err) {
      console.log(err, 'err');
    } finally {
      step.value = 'firstStep';
      previewing.value = false;
    }
  };
  // const handleBeforeCancel = () => {
  //   if (step.value === 'firstStep') {
  //     return true;
  //   }
  //   if (step.value === 'lastStep') {
  //     step.value = 'middle';
  //     return false;
  //   }
  //   if (step.value === 'middle') {
  //     step.value = 'firstStep';
  //     return false;
  //   }
  //   return true;
  // };

  function handleCancel(e: any) {
    if (e.currentTarget.tagName === 'BUTTON') {
      // 点击的是取消
      if (step.value === 'middle') {
        step.value = 'firstStep';
        return;
      }
      if (step.value === 'lastStep') {
        step.value = 'middle';
        return;
      }
      previewVisible.value = false;
      step.value = 'firstStep';
    } else {
      // 点击的是关闭按钮
      // console.log(e.currentTarget.tagName, 'e.currentTarget.tagNamee.currentTarget.tagName')
      previewVisible.value = false;
      step.value = 'firstStep';
    }
  }

  const createdHook = async () => {
    const { data } = await getBranch({
      repo: 'uni-flower-mall',
    });
    console.log(data, 'datadata')
    branchOptions.value = data.map((item: any) => item.name);
  };

  createdHook();
</script>

<style scoped lang="less">
  .banner {
    width: 100%;
    padding: 20px 20px 0 20px;
    background-color: var(--color-bg-2);
    border-radius: 4px 4px 0 0;
  }

  :deep(.arco-icon-home) {
    margin-right: 6px;
  }
</style>
