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
          />
        </div>

        <div class="pure-control-group">
          <label for="scroll-checkbox">опыт в свитках</label>
          <input
            type="checkbox"
            id="scroll-checkbox"
            v-model="state.scrollsCheckbox"
          />
        </div>

        <div class="pure-control-group" v-if="state.scrollsCheckbox">
          <label for="scrolls" />
          <input
            type="text"
            id="scrolls"
            placeholder="37kk"
            v-model.trim="state.scrolls"
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
          />
        </div>

        <div class="pure-control-group">
          <label for="time">время</label>
          <input
            type="text"
            id="time"
            autocomplete="off"
            v-model.trim="stringifiedTime"
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
</style>

<script lang="ts">
import { reactive, computed, ref } from 'vue';
import { getExp } from './helpers/get-exp';
import { formatNumber } from './helpers/format-number';
import { parseNumber } from './helpers/parse-number';
import { parseTime } from './helpers/parse-time';
import { timeToString } from './helpers/time-to-string';

interface State {
  scrolls: string;
  scrollsCheckbox: boolean;
}

export default {
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  setup() {
    const state: State = reactive<State>({
      scrolls: '',
      scrollsCheckbox: false
    });

    const from = ref(76);
    const to = ref(80);

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

    return {
      from,
      to,

      stringifiedExp,
      exp,
      isValidExp,

      stringifiedTime,
      isValidTime,

      needExp,
      needExpStringified,
      result,
      state
    };
  }
};
</script>
