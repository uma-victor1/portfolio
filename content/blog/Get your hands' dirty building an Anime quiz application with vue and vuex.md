---
title: "Get your hands' dirty building an Anime quiz application with vue and vuex"
date: "2021-06-06"
coverImage: "vue-img.png"
author: "Uma Victor"
tags: ["Auth","JWT","Vue.js"]
description: "Explore Vue and the Vuex store by building an Anime quiz application"
---

## What we will be building

- live demo  [here](https://anime-quiz.netlify.app/) 
- Github code  [here](https://github.com/uma-victor1/Anime-Quiz) 
-  [Codesandbox
](https://codesandbox.io/s/nameless-cherry-uusul) 


## Let's plan!!
Our Quiz application is going to have 3 components:  

**Header**: This is where our logo and reset button will be 
**   
Select**: Here is where we can set the difficulty level of our app    
**Quiz**: This is where our quiz question and options will be. 

we will be making use of the  [open trivia database](https://opentdb.com/api_config.php)  API, this is where we will fetch our anime questions from. There are many other subjects to quiz on. So you can select any one really that you want.
### What we will be needing.
-  [understanding of vuex](https://codingbuddy.hashnode.dev/today-you-understand-vuex) 
- Lodash

### Breaking things down
we need to:
- [set up our project](#setting-up-our-project)
- [Create a form to select the difficulty level](#create-our-form)
- [fetch the questions from the API and store them in an array](#fetching-our-questions)
- [create next button navigation functionality to move to the next question](#next-button-functionality)
- [Adding Question option and shuffling our question array](#adding-question-options)
- [User Story](#user-story)
- [create submit button and submit functionality](#submitting-our-selected-answer)
- [Side effects](#side-effects)
- [Add visual feedback](#visual-feedback)
- [Scoreboard](#scoreboard)

### setting up our project
You can start a new project using the  [vue cli](https://cli.vuejs.org/guide/installation.html) but you have to install the cli first by running-
```
npm install -g @vue/cli
 OR
yarn global add @vue/cli
```
after the `cli` is installed you can create a new project by running-
```
vue create anime-quiz

```
you will then be prompted to select some basic setup. In your setup, select Babel, Linter, and vuex!. That's all we need.

![cli-select-features.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1605870458305/j0btR2lfO.png)

### Building the project
After we have set up our project, we create three components in our component folder named `Header.vue`, `Select.vue`, and `Quiz.vue`.
we import them in our main app component
```javascript
<template>
  <div id="app">
    <Header/>
    <Select/>
    <Quiz/>
  </div>
</template>

<script>
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import Select from "./components/Select";

export default {
  name: "App",
  components: {
    Header,
    Select,
    Quiz
  }
};
</script>
```
In our header component, we are going to put the quiz name and reset button in there, for now, we will be coming back to the header component later in the tutorial
```
<template>
  <div>
    <header>
      <h1>Anime Quiz</h1>
      <div>
      <button>Reset</button>
      </div>
    </header>
  </div>
</template>
```
In our store, we declare a `difficultyLevel` state and set it to `null`
```
  state: {
    difficultyLevel: null
  },
```
## Create our form
Then in our select component, we create a form so we can set the select difficulty level. we also create a local data in our component called `difficulty` then we dynamically model it to our form using Vue's provided `v-bind` directive.  

Then we create a `start quiz` button so that when clicked it can set our difficulty level to whatever difficulty we had chosen in our form. Then we start our quiz.
```
<template>
  <div>
    <div>
      <form>
        <label for="difficulty">select difficulty:</label>
        <select v-model="difficulty" name="difficulty" id="difficulty">
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <br /><br />
        <button @click.prevent="startQuiz()">Start Quiz</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      difficulty: ''
    }
  },
}
</script>
```

![select.gif](https://cdn.hashnode.com/res/hashnode/image/upload/v1607294184605/C5Dal2U8M.gif)

When the `start quiz` button is clicked, it calls the `startQuiz()` function. All this function does is to dispatch an action. let's call the action `beginQuiz`.  

The action is dispatched with the `difficulty` variable in our component that we modeled to the form. It is dispatched with the `difficulty` as a payload(that is an argument).
```
<script>
export default {
  data () {
    return {
      difficulty: ''
    }
  },
  methods: {
    startQuiz () {
      this.$store.dispatch('beginQuiz', this.difficulty)
    }
  }
}
</script>
```
Back in our vuex store actions, we create a `beginQuiz` action and it accepts `commit` and `payload` as its argument. The first thing this action does is to commit a mutation called `SET_DIFFICULTY` and when the mutation is called, it changes our difficulty level in our state to the one the user chose passing the difficulty payload to our mutation.

```javascript
export default new Vuex.Store({
  state: {
    difficultyLevel: null
  },
  mutations: {
    SET_DIFFICULTY (state, difficulty) {
      state.difficultyLevel = difficulty
    }
  },
  actions: {
    beginQuiz: ({ commit }, difficulty) => {
      commit('SET_DIFFICULTY', difficulty)
  }
 },
}
)
```
Since our `difficultyLevel` has now been set, we can make our request to the tdb API and fetch our questions. Our endpoint looks like this 
```
fetch(`https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple`)
```
 we can notice one of the parameters in the endpoint has difficulty set to easy by default,
we can bind it dynamically with our difficulty level which has been set by the user 
```
fetch(`https://opentdb.com/api.php?amount=10&category=31&difficulty=${state.difficultyLevel}&type=multiple`)
```
The response data we get from the API looks like  [this
](https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple) 
![api.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1607792732924/ilEDXH2Uy.jpeg)

## Fetching our questions
In our store let's create a question array, that will contain all the questions we have just fetched from our API and a `current` variable set to zero initially, representing our current question.  
```
 state: {
    Question: [],
    current: 0,
    difficultyLevel: null
  },
```
Then when we receive our response we will commit a `SET_QUESTION` mutation with our response data as payload which then sets the question in our store to equal the response data from our API.

**NOTE: **The request to the API is made immediately after `SET_DIFFICULTY` has been committed
```
 mutations: {
    SET_DIFFICULTY (state, difficulty) {
      state.difficultyLevel = difficulty
    },
    SET_QUESTION (state, data) {
      state.Question = data
    }
  },
  actions: {
    beginQuiz: ({ commit, state }, difficulty) => {
      commit('SET_DIFFICULTY', difficulty)
      fetch(`https://opentdb.com/api.php?amount=10&category=31&difficulty=${state.difficultyLevel}&type=multiple`)
        .then(response => response.json())
        .then(data => {
          commit('SET_QUESTION', data.results)
          console.log(state.Question)
          })
        .catch(error => console.log(error))
  }
 },
```

Now all the questions are available to us in our question array. If you look at the Question array, you will notice it is an array of ten objects, with each object containing a question and the correct and incorrect answer(array). We will move to our `Quiz.vue` component and setup the markup for our quiz component, also using vuex mapstate helper we will map our `Question` & `current` state to the quiz component so that we can use it.
```
<template>
  <div>
    <div class="container">
      <div v-if="Question.length">
        <h1><span>Question: {{current + 1}} </span></h1>
        <h2>{{ Question[current].question }}</h2>
        <div class="nav">
          <button>Submit</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['Question', 'current']),
  },
}
</script>

```
Above, we see that our `Question` and `current` state have been made available in the quiz component with our mapState helper. While in our template we have our question for the first object printed out because `current` is still zero. We also have two buttons to either submit or move to the next question. Our app looks like this:

![preview.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1607795798268/v0olK4KZc.jpeg)

## Next button functionality
To able to move to the next question, we add a click event handler to our button called  `next` mapped to our mapActions.
```
// template //
<button @click="next">Next</button>

// script //
<script>
import { mapState, mapActions } from 'vuex'
export default {
  methods:{
    ...mapActions(['next'])
  },
  computed: {
    ...mapState(['Question', 'current']),
  },
}
</script>
```
in our actions we call a `next` action that calls a `NEXT` mutation that increments the`current` variable in our state by 1 each time it is clicked. By doing this our question changes each time the next button is clicked.
```
  mutations: {
// other code //
   NEXT (state) {
      state.current++
    }
  }
  actions: {
// other code //
  next: ({ commit }) => {
      commit('NEXT')
    }
  }
```
## Adding Question options
Now let's add our question options. But the way our JSON response is structured as we saw earlier, is it displays our incorrect answers in one array and the correct answer on its own.
so what we need to do is create a new array with the correct and incorrect answers in it. Then shuffle that newly created array so that our correct answer doesn't always appear in one place when we navigate to the next question.

To achieve this we must have installed lodash if not run
```
npm install lodash
OR
yarn add lodash
```
import it at the top of our store file
```
import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash' // here

```
then add a  `shuffledAnswers` variable in our store, and commit a `SHUFFLE_ANSWER` mutation in our `beginQuiz` action after our response from the API has been returned.  

Then in the `SHUFFLE_ANSWER` mutation, we create a variable called `options` then using lodash `_.concat` method we add the correctanswer to the incorrect answer array, setting it equal to `options`. Then we use the `._shuffle` lodash method to shuffle our options array and assign the shuffled options array to our `shuffledAnswers` variable in state.
```javascript
  state: {
    shuffledAnswers: [],
  },
 mutations: {
    SHUFFLE_ANSWER(state) {
      var Options;
      Options = _.concat(
        state.Question[state.current].incorrect_answers,
        state.Question[state.current].correct_answer
      );
      state.shuffledAnswers = _.shuffle(Options);
      console.log(state.shuffledAnswers);
    }
  },
  actions: {
    beginQuiz: ({ commit, state }, difficulty) => {
      commit("SET_DIFFICULTY", difficulty);
      fetch(
        `https://opentdb.com/api.php?amount=10&category=31&difficulty=${state.difficultyLevel}&type=multiple`
      )
        .then((response) => response.json())
        .then((data) => {
          commit("SET_QUESTION", data.results);
          commit("SHUFFLE_ANSWER");
        })
        .catch((error) => console.log(error));
    },
```
We have gotten our shuffled options array, so let's add it to the quiz component. We will loop over the array with a `v-for` and display the option.
```
<template>
  <div>
    <div class="container">
      <div v-if="Question.length">
        <h1><span>Question: {{current + 1}} </span></h1>
        <h2>{{ Question[current].question }}</h2>
        <div class="options">
          <ul v-for="(options, index) in shuffledAnswers" :key="index">
            <li>{{ options }}</li>
          </ul>
        </div>
        <div class="nav">
          <button>Submit</button>
          <button @click="next">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

```
we set the `:key` to the index of the option in the array
lets add some css to style our list
```
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

ul li {
  border: 1px solid #ddd;
  margin-top: -1px; /* Prevent double borders */
  background-color: #f6f6f6;
  padding: 12px;
}
li:hover{
    background:white;
    cursor:pointer;
}
```
### User Story
Now we have added our options, The functionality we want is for the user to be able to click on the option they think is correct, then submit it. The submit button has to be disabled until an answer is chosen.

And after an answer is submitted we want that option to turn green if correct or red if incorrect. when the user has gotten visual feedback if correct or not, he can then move to the next question, and the process continues till they reach the end.

To achieve this, we will be adding the following variables in store: 
```
  state: {
    selectedIndex: null,
    correctIndex: null,
    correctAnswers: 0,
    answered: false,
  },
```
- `selectedIndex` will store the index of the option that was selected
- `correctIndex` will store which index is correct
- `correctAnswers` will store how many answers the user got correctly. It is set as 0 initially because the user has no score yet.
- `answered` is a boolean that stores if the user has answered or not.

so back in our quiz component, we add a click event called `selectedAnswer(index)` that takes in the index of the option clicked as an argument.
```
        <div class="options">
          <ul v-for="(options, index) in shuffledAnswers" :key="index">
            <li @click="selectedAnswer(index)">{{ options }}</li>
          </ul>
        </div>

```
when clicked we dispatch an action `selectedAnswer` in our `mapActions`.
This action commits a `SELECTED_ANSWER` mutation along with the index of the option chosen as an argument.
Then our mutation sets `selectedIndex` in state to the index of the option chosen.
```
 mutations: {
// other code //
 SELECTED_ANSWER (state, index) {
      console.log(index)
      state.selectedIndex = index
    }
  },
 actions: {
// other code //
    selectedAnswer: ({ commit }, index) => {
      commit('SELECTED_ANSWER', index)
    },
  }
```
We need to shuffle the options each time we click next to move to the next question, so we add a vue watcher in our quiz component that watches the `current` state and shuffle our array each time it changes by committing the `SHUFFLE_ANSWER` mutation.
```
   watch: {
    current: {
      handler () {
        this.$store.commit('SHUFFLE_ANSWER')
      }
    }
  }
```
Our correct index can be gotten easily using lodash `.indexOf` method by setting the `correctIndex` state to the index of the correctanswer in our shuffled answer array. This is done in our `SHUFFLE_ANSWER` mutation.
```
SHUFFLE_ANSWER (state) {
      var Options
      Options = _.concat(state.Question[state.current].incorrect_answers, state.Question[state.current].correct_answer)
      state.shuffledAnswers = _.shuffle(Options)
      state.correctIndex = state.shuffledAnswers.indexOf(state.Question[state.current].correct_answer)
    },
```

### Submitting our selected answer
we will add a `submit` event on our submit button, and when the button is clicked, a `submit` action is dispatched, and in the actions, we check if what the user selected was correct or not by creating a boolean variable `iscorrect` and if the `selectedIndex` is equal to the `correctIndex` then the user is correct and we set `iscorrect` to true.  
 
Then we commit a `SUBMIT` mutation with `iscorrect` as an argument.
In the `SUBMIT` mutation, if a user is correct, we increment our `correctAnswers` in the state. Also `answered` is set to true because the question has been answered and submitted.
```javascript
// template //
<button @click="submit">Submit</button>

import { mapState, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['next', 'selectedAnswer', 'submit']),
  },
  computed: {
    ...mapState(['Question', 'current', 'shuffledAnswers'])
  },
  watch: {
    current: {
      handler () {
        this.$store.commit('SHUFFLE_ANSWER')
      }
    }
  }
}
</script>

```
```
  mutations: {
// other code //
    SUBMIT (state, iscorrect) {
      if (iscorrect) {
        state.correctAnswers++
      }
      state.answered = true
    },
  }
  actions: {
// other code //
    submit: ({ commit, state }) => {
      let iscorrect = false
      if (state.selectedIndex === state.correctIndex) {
        iscorrect = true
      }
      commit('SUBMIT', iscorrect)
    },
  }
```
### Side effects
**1.** Each time we move to the next question our selected index from the last question does not change and also answered is always set to true after the first question.  
The solution is to commit a `RESET` mutation in our watch method we declared earlier that sets the `selectedIndex` back to null and `answered` to false when we move to the next question. 
```
  watch: {
    current: {
      handler () {
        this.$store.commit('RESET')
        this.$store.commit('SHUFFLE_ANSWER')
      }
    }
  }
```
```
 mutations: {
   RESET (state) {
      state.selectedIndex = null
      state.answered = false
    }
  }
```


**2.** We notice that we can move to the next question and even submit an unanswered question. we don't want this functionality. so let's fix this.
First of all, make sure all the state variables we need are mapped in our quiz component 

```
computed: {
    ...mapState(['Question', 'current', 'selectedIndex', 'shuffledAnswers', 'correctIndex', 'answered', 'correctAnswers'])
  },
```
now we want our submit button to be disabled when the user has not selected any option or when it's not answered.
```
<button @click="submit" :disabled="selectedIndex == null || answered">Submit</button>
```
and we want the next button to be disabled only when the user has not yet submitted which means `answered` is false.
```
<button @click="next" :disabled="answered == false">Next</button>
```

**3.** We notice that if the user decides to change the difficulty level midway through the quiz, it does not start from question 1, rather it continues from the number the user stopped in the last difficulty level.  
we can resolve this by committing a `RESETQUIZ` quiz mutation after our API call. The mutation changes our `current` and `correctAnswers` state back to zero.
```
 mutations: {
    RESETQUIZ (state) {
      state.current = 0
      state.correctAnswers = 0
    }
  }
// in our beginQuiz action //
    fetch(`https://opentdb.com/api.php?amount=10&category=31&difficulty=${state.difficultyLevel}&type=multiple`)
        .then(response => response.json())
        .then(data => {
          commit('SET_QUESTION', data.results)
          commit('STOP_LOADING')
          commit('SHUFFLE_ANSWER')
          commit('RESETQUIZ')
        })
```
This mutation is reusable and we will reuse it in our header component.
In our header component remember we added a reset button. When the user clicks this button, the quiz will restart.  
we add a click event handler that commits our  `'RESETQUIZ` mutation directly in our template.
```
<template>
  <div>
    <header>
      <h1>Anime Quiz</h1>
      <div>
      <button @click="$store.commit('RESETQUIZ')">Reset</button>
      </div>
    </header>
  </div>
</template>
```
### Visual feedback
Adding the following CSS to your quiz component
```
.selected{
    background: skyblue;
}
.correctanswer{
    background: springgreen;
}
.incorrectanswer{
    background: tomato;
}
```
we want the user to know when they are wrong or right when they submit an answer, so we bind a class to our options list called `checkAnswerClass(index)` that takes the index as an argument and we write some logic to figure out what class to add.
```
<div class="options">
          <ul v-for="(options, index) in shuffledAnswers" :key="index">
            <li @click="selectedAnswer(index)" :class="checkAnswerClass(index)">{{ options }}</li>
          </ul>
        </div>
```
we want to add the `selected` class when the user has not answered yet and the `selectedIndex` equals the `index`.

we want to add the `correctanswer` class when the user has answered and the `correctIndex` equals the index of the option chosen.

we want to add the `incorrectanswer` class when the user has answered and the `selectedIndex` equals index of the option chosen and the `correctIndex` not equals to the index of the option chosen.
```
  methods: {
    checkAnswerClass (index) {
      let answerClass = ''
      if (!this.answered && this.selectedIndex === index) {
        answerClass = 'selected'
      } else if (this.answered && this.correctIndex === index) {
        answerClass = 'correctanswer'
      } else if (this.answered && this.selectedIndex === index && this.correctIndex !== index) {
        answerClass = 'incorrectanswer'
      }
      return answerClass
    }
  },
```
### scoreboard
We want the player to be able to see their performance as they answer the quiz, so we add 
```
 <div>
          <h1>Score: <span>{{correctAnswers}}/{{Question.length}}</span></h1>
        </div>
```
in our quiz component. we are setting `correctAnswers` over the length of our Question array.

## Conclusion
We have come to the end of this tutorial, I hope you learned a few things building this quiz application. You can style it to your taste and add some more functionality if you want like a loader that appears when waiting for the response from the API or allow the user to choose the number of questions they want.
