<template>
  <div id="app">
      <div class="filter">
        <div class="input-field">
          <label for="input">Введите количество очков</label>
          <input 
            id="input" 
            class="" 
            type="number" 
            v-model="points" 
            @keydown.enter="changeCurrentPoints"
          >
        </div>
        <div class="input-field">
          <label for="select">Выберите количество уровней</label>
          <select 
            id="select" 
            v-model="levelAmount">
            <option 
              v-for="i in 9"
              :value="i" 
              :key="i"
            >
              {{i}}
            </option>
          </select>
        </div>
        <button @click="changeCurrentPoints">Применить</button>
      </div>
    <div class="container">
      <level-list :levels="getLevels"/>
      <points-value :levels="getLevels"/>
    </div>
  </div>
</template>

<script>
import LevelList from '@/components/level-list'
import PointsValue from '@/components/points-value'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    LevelList,
    PointsValue
  },
  data () {
    return {
      points: 2512,
      levelAmount: 6,
    }
  },
  computed: {
    ...mapGetters(['getLevels', 'getPoints', ]),
  },
  mounted () {
    this.changeLevels()
    this.setCurrentLevel()
  },
  methods: {
    ...mapMutations(['setLevel', 'setPoints', 'setLevelsCount']),
    changeCurrentPoints() {
      this.setPoints(+this.points)
      this.changeLevels()
      this.setCurrentLevel()
    },
    setCurrentLevel() {
      this.getLevels.forEach((item, i, arr) => {
        if (item?.points < this.getPoints && this.getPoints < arr[i+1]?.points || item?.points < this.getPoints && !arr[i+1]?.points) {
          this.setLevel(i)
          return
        }
      })
    },
    changeLevels() {
      this.setLevelsCount(+this.levelAmount)
    },
  }
}
</script>