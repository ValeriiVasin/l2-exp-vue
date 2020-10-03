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
            v-model.number="state.from"
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
            v-model.number="state.to"
            :min="state.from"
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
          <input readonly id="need-exp" type="text" :value="needExp" />
        </div>

        <legend>расчет</legend>
        <div class="pure-control-group">
          <label for="exp">опыт</label>
          <input type="text" id="exp" v-model.trim="state.exp" />
        </div>

        <div class="pure-control-group">
          <label for="time">время</label>
          <input type="text" id="time" v-model.trim="state.time" />
        </div>

        <div class="pure-control-group">
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
import { ComputedRef, defineComponent } from 'vue';
import { reactive, computed } from 'vue';

interface State {
  from: number;
  to: number;
  scrolls: string;
  scrollsCheckbox: boolean;
  exp: string;
  time: string;
}

export default {
  setup() {
    const state: State = reactive<State>({
      from: 76,
      to: 80,
      scrolls: '',
      scrollsCheckbox: false,
      exp: '30kk',
      time: '1ч'
    });

    const needExp = computed(() => state.from + state.to);
    const result = computed(() => '10д 8ч 10м');

    return {
      needExp,
      result,
      state
    };
  }
};
</script>
