<script lang="ts" setup>
  import { Dialog, Snackbar, useNotifications } from '@vuetify/v0'
  import { shallowRef } from 'vue'

  const notifications = useNotifications()
  const dialogOpen = shallowRef(false)
  let counter = 0

  function notifyOutside (): void {
    counter += 1
    notifications.send({
      timeout: 999_999,
      severity: 'info',
      subject: `Outside snackbar #${counter}`,
    })
  }

  function notifyInside (): void {
    counter += 1
    notifications.send({
      timeout: 999_999,
      severity: 'success',
      subject: `Inside-dialog snackbar #${counter}`,
    })
  }
</script>

<template>
  <main class="sandbox">
    <header class="header">
      <h1>Snackbar inside Dialog — sandbox</h1>

      <p>
        Queue-driven snackbars created on-the-fly via
        <code>useNotifications()</code>. Snackbar.Portal uses
        <code>useStack</code> to layer above the Dialog scrim.
      </p>
    </header>

    <section class="actions">
      <button
        class="button"
        type="button"
        @click="notifyOutside"
      >
        Show snackbar (outside dialog)
      </button>

      <Dialog.Root v-model="dialogOpen">
        <Dialog.Activator class="button">
          Open dialog
        </Dialog.Activator>

        <Dialog.Content class="dialog">
          <Dialog.Title>
            Dialog
          </Dialog.Title>

          <p class="dialog-body">
            Snackbars triggered from inside this dialog should appear above
            the scrim and remain interactive without closing the dialog.
          </p>

          <div class="dialog-actions">
            <button
              class="button"
              type="button"
              @click="notifyInside"
            >
              Show snackbar (inside dialog)
            </button>

            <Dialog.Close class="button button-secondary">
              Close
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </section>

    <Snackbar.Portal>
      <Snackbar.Queue v-slot="{ items }">
        <div class="queue">
          <div
            v-for="item in items"
            :key="item.id"
          >
            <Snackbar.Root
              :id="item.id"
              class="snackbar"
              :data-severity="item.severity"
            >
              <Snackbar.Content class="snackbar-text">
                item.subject
              </Snackbar.Content>

              <Snackbar.Close class="snackbar-close">
                ×
              </Snackbar.Close>
            </Snackbar.Root>
          </div>
        </div>
      </Snackbar.Queue>
    </Snackbar.Portal>
  </main>
</template>

<style scoped>
.sandbox {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  min-height: 100vh;
  background-color: #1b1d23;
  color: #e6e7eb;
  font-family: system-ui, sans-serif;
}

.header h1 {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
}

.header p {
  margin: 0;
  max-width: 640px;
  color: #a4a8b3;
  line-height: 1.5;
}

.header code {
  padding: 1px 6px;
  background-color: #2e303a;
  border-radius: 4px;
  font-size: 13px;
}

.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.button {
  padding: 8px 16px;
  background-color: #4060ff;
  color: #fff;
  border: 0;
  border-radius: 6px;
  font: inherit;
  cursor: pointer;
}

.button:hover {
  background-color: #5570ff;
}

.button-secondary {
  background-color: #3a3d47;
}

.button-secondary:hover {
  background-color: #4a4d57;
}

.dialog {
  width: min(420px, calc(100vw - 32px));
  padding: 24px;
  background-color: #2e303a;
  color: #e6e7eb;
  border: 0;
  border-radius: 8px;
  box-shadow: 0 24px 48px rgb(0 0 0 / 50%);
}

.dialog::backdrop {
  background-color: rgb(0 0 0 / 60%);
}

.dialog-body {
  margin: 0 0 20px;
  color: #a4a8b3;
  line-height: 1.5;
}

.dialog-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.queue {
  position: fixed;
  right: 24px;
  bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.snackbar {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 260px;
  padding: 12px 16px;
  background-color: #2e303a;
  border-left: 3px solid #4060ff;
  border-radius: 6px;
  box-shadow: 0 8px 24px rgb(0 0 0 / 40%);
}

.snackbar[data-severity='success'] {
  border-left-color: #3fbf6f;
}

.snackbar[data-severity='warning'] {
  border-left-color: #f5a623;
}

.snackbar[data-severity='error'] {
  border-left-color: #e25555;
}

.snackbar-text {
  flex: 1;
}

.snackbar-close {
  width: 24px;
  height: 24px;
  background-color: transparent;
  color: #a4a8b3;
  border: 0;
  border-radius: 4px;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}

.snackbar-close:hover {
  background-color: #3a3d47;
  color: #fff;
}
</style>
