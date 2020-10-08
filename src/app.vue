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
            min="1"
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
            min="1"
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
            autocomplete="off"
            placeholder="37kk"
            v-model.trim="scrollsValue"
            :class="{ error: scrollsValue !== '' && !isScrollsExpValid }"
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

        <template v-if="isValidResult && isValidExp && isValidTime">
          <div class="pure-control-group" v-if="isRelativeResult">
            <label
              @click="toggle"
              class="togglable"
              title="переключиться к дате"
              >потребуется</label
            >
            <input type="text" readonly :value="resultString" />
          </div>
          <div class="pure-control-group" v-else>
            <label
              @click="toggle"
              class="togglable"
              title="переключиться ко времени"
              >завершится</label
            >
            <input type="text" readonly :value="resultDate" />
          </div>
        </template>
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

.togglable {
  cursor: pointer;
}
</style>

<script lang="ts">
import { computed, ref, watch, nextTick } from 'vue';
import { getExp } from './helpers/get-exp';
import { formatNumber } from './helpers/format-number';
import { parseNumber } from './helpers/parse-number';
import { parseTime } from './helpers/parse-time';
import { timeToString } from './helpers/time-to-string';
import formatRelative from 'date-fns/formatRelative';
import { ru } from 'date-fns/locale';
import { formatExp } from './helpers/format-exp';

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

    const levelExp = computed(() => getExp({ from: from.value, to: to.value }));

    const scrollsCheckbox = ref(false);
    const scrollsValue = ref('');
    const scrollsExp = computed(() => parseNumber(scrollsValue.value));
    const isScrollsExpValid = computed(
      () => !Number.isNaN(scrollsExp.value) && scrollsExp.value > 0
    );
    const scrollsInputRef = ref<HTMLInputElement | null>(null);

    const needExp = computed(() => {
      if (!scrollsCheckbox.value) {
        return Math.max(0, levelExp.value);
      }

      const value = isScrollsExpValid.value
        ? levelExp.value - scrollsExp.value
        : levelExp.value;

      return Math.max(0, value);
    });
    const needExpStringified = computed(() => formatExp(needExp.value));

    const stringifiedExp = ref('30kk');
    const exp = computed(() => parseNumber(stringifiedExp.value));
    const isValidExp = computed(
      () => !Number.isNaN(exp.value) && exp.value > 0
    );

    const stringifiedTime = ref('1ч');
    const time = computed(() => parseTime(stringifiedTime.value));
    const isValidTime = computed(() => !Number.isNaN(time.value));

    const expPerMinute = computed(() => Math.floor(exp.value / time.value));

    watch(scrollsCheckbox, value => {
      if (!value) {
        scrollsValue.value = '';
        return;
      }

      nextTick(() => scrollsInputRef.value?.focus());
    });

    const result = computed(() => {
      if (expPerMinute.value === 0) {
        return Infinity;
      }

      return Math.floor(needExp.value / expPerMinute.value);
    });
    const isValidResult = computed(() => Number.isFinite(result.value));
    const resultString = computed(() => {
      if (!isValidResult.value) {
        return '';
      }

      return timeToString(result.value);
    });

    const resultDate = computed(() => {
      if (!isValidResult.value) {
        return '';
      }

      const date = new Date();
      date.setMinutes(date.getMinutes() + result.value);

      return formatRelative(date, new Date(), { locale: ru });
    });

    const isRelativeResult = ref(true);

    const toggle = () => (isRelativeResult.value = !isRelativeResult.value);

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
      isScrollsExpValid,
      scrollsInputRef,

      stringifiedTime,
      isValidTime,

      needExpStringified,

      isValidResult,
      resultString,
      resultDate,
      isRelativeResult,
      toggle
    };
  }
};
</script>
