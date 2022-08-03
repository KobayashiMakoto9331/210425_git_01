<template>
  <div>
    <header class="mb-auto">
      <nav class="navbar navbar-dark bg-dark">
        <span class="navbar-brand mb-0 h1">{{ title }}</span>
      </nav>
    </header>
  </div>
</template>

<script>
export default({

  data() {
    return {
      title: "タスク管理アプリ"
    }
  }
})
</script>