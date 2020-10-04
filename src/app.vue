<template>
  <main>
    <form class="form pure-form pure-form-aligned">
      <fieldset>
        <legend>уровень</legend>
        <div class="pure-control-group">
          <label for="from">от</label>
          <input
            type="number"
            id="from"
            v-model.number="from"
            min="0"
            max="90"
            step="any"
            :class="{ error: !isValidFrom }"
          />
        </div>

        <div class="pure-control-group">
          <label for="to">до</label>
          <input
            type="number"
            id="to"
            v-model.number="to"
            :min="from"
            max="90"
            step="any"
            :class="{ error: !isValidTo }"
          />
        </div>

        <div class="pure-control-group">
          <label for="scroll-checkbox">опыт в свитках</label>
          <input
            type="checkbox"
            id="scroll-checkbox"
            v-model="scrollsCheckbox"
          />
        </div>

        <div class="pure-control-group" v-if="scrollsCheckbox">
          <label for="scrolls" />
          <input
            ref="scrollsInputRef"
            type="text"
            id="scrolls"
            placeholder="37kk"
            v-model.trim="scrollsValue"
          />
        </div>

        <div class="pure-control-group">
          <label for="need-exp">нужно опыта</label>
          <input
            readonly
            id="need-exp"
            type="text"
            :value="needExpStringified"
          />
        </div>

        <legend>скорость прокачки</legend>
        <div class="pure-control-group">
          <label for="exp">опыт</label>
          <input
            type="text"
            id="exp"
            autocomplete="off"
            v-model.trim="stringifiedExp"
            placeholder="25kk"
            :class="{ error: !isValidExp }"
          />
        </div>

        <div class="pure-control-group">
          <label for="time">время</label>
          <input
            type="text"
            id="time"
            autocomplete="off"
            v-model.trim="stringifiedTime"
            placeholder="20м"
            :class="{ error: !isValidTime }"
          />
        </div>

        <div
          class="pure-control-group"
          v-if="isValidExp && isValidTime && result"
        >
          <label for="result">потребуется</label>
          <input type="text" readonly id="result" :value="result" />
        </div>
      </fieldset>
    </form>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
}

.form {
  display: inline-flex;
}
/* specificity needed to overwrite pure css styles */
form input.error {
  border-color: red;
  &:focus {
    border-color: red;
  }
}
</style>

<script lang="ts">
import { computed, ref, watch, nextTick } from 'vue';
import { getExp } from './helpers/get-exp';
import { formatNumber } from './helpers/format-number';
import { parseNumber } from './helpers/parse-number';
import { parseTime } from './helpers/parse-time';
import { timeToString } from './helpers/time-to-string';

export default {
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  setup() {
    const from = ref(76);
    const to = ref(80);

    const isValidFrom = computed(
      () => typeof from.value === 'number' && from.value >= 1 && from.value < 90
    );
    const isValidTo = computed(
      () =>
        typeof to.value === 'number' && to.value > from.value && to.value < 90
    );

    const needExp = computed(() => getExp({ from: from.value, to: to.value }));
    const needExpStringified = computed(() => formatNumber(needExp.value));

    const stringifiedExp = ref('30kk');
    const exp = computed(() => parseNumber(stringifiedExp.value));
    const isValidExp = computed(
      () => !Number.isNaN(exp.value) && exp.value > 0
    );

    const stringifiedTime = ref('1ч');
    const time = computed(() => parseTime(stringifiedTime.value));
    const isValidTime = computed(() => !Number.isNaN(time.value));

    const expPerMinute = computed(() => Math.floor(exp.value / time.value));

    const result = computed(() => {
      if (expPerMinute.value === 0) {
        return '';
      }

      return timeToString(Math.floor(needExp.value / expPerMinute.value));
    });

    const scrollsCheckbox = ref(false);
    const scrollsValue = ref('');
    const scrollsInputRef = ref<HTMLInputElement | null>(null);

    watch(scrollsCheckbox, value => {
      scrollsValue.value = '';

      if (value) {
        nextTick(() => scrollsInputRef.value?.focus());
      }
    });

    return {
      from,
      isValidFrom,

      to,
      isValidTo,

      stringifiedExp,
      exp,
      isValidExp,

      scrollsCheckbox,
      scrollsValue,
      scrollsInputRef,

      stringifiedTime,
      isValidTime,

      needExp,
      needExpStringified,
      result
    };
  }
};
</script>
