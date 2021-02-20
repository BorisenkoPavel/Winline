<template>
  <div class="level-list">
      <div class="level-list__title">Уровень в следующем месяце</div>
      <div class="level-list-items">
        <level-list-item 
          v-for="(item, i) in levels" 
          :key="i+1"
          :item="item"
          :isLevelPast="i < currentLevel"
          :isLevelCurrent="i === currentLevel"
          @mouseover.native="changeLevel(item, i)"
        />
      </div>
    <div class="progress-bar" v-if="levels.length > 1"> 
      <div class="progress-bar__inner" :style="{transform: `scaleX(${progressValue})`}"/>
      <div 
        v-for="(el, i) in progressSteps" 
        :key="i" 
        :class="['progress-bar__step', {'progress-bar__step--active': i < currentLevel}]"
      >
        <icon 
          v-if="i < currentLevel" 
          class="progress-bar__icon" 
          icon-name="confirm" 
          width="9" 
          height="7"/>
        <icon 
          v-else 
          class="progress-bar__icon" 
          icon-name="lock" 
          width="8" 
          height="10"/>
        <div class="progress-bar__value">{{el.points}}
          <icon 
            icon-name="coins" 
            width="6" 
            height="7"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/common-components/icon'
import LevelListItem from './level-list-item'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    Icon,
    LevelListItem
  },
  props: {
    levels: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters({currentPoints: 'getPoints', currentLevel: 'getCurrentLevel'}),
    progressSteps () {
      return this.levels.filter((el, i) => i)
    },
    progressValue () {
      const widthStep = 100 / ( this.levels.length - 1 )
      const currentLimit = this.levels[this.currentLevel]?.points
      const nextlimit = this.levels[this.currentLevel + 1]?.points - currentLimit
      const progressPercent = ( this.currentPoints - currentLimit ) / nextlimit * 100
      const widthProgressBar = (widthStep * this.currentLevel + (widthStep / 100 * progressPercent)) / 100
      return widthProgressBar <= 1 ? widthProgressBar : 1
    },
  },
  methods: {
    ...mapMutations(['setPoints', 'setLevel']),
    changeLevel(level, i) {
      this.setPoints(level.points || 0)
      this.setLevel(i || 0)
    },
  }
}
</script>

<style src="./style.scss" lang="scss"/>
