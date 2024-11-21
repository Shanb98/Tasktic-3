<template>
    <v-container>
      <div class="board-container">
        <!-- Render each column -->
        <v-card
          v-for="(column, colIndex) in boardColumns"
          :key="colIndex"
          class="column"
          outlined
          height="75vh"
        >
          <v-card-title class="column-title">{{ column.title }}</v-card-title>
          <v-divider></v-divider>
  
          <!-- Draggable container for tasks within each column -->
          <draggable
            class="task-list"
            :list="column.tasks"
            :group="{ name: 'tasks', pull: pullFunction, put: true }"
            @start="start"
            @end="onTaskDrop"
          >
            <!-- Render each task within the column as a card -->
            <v-card
              v-for="task in column.tasks"
              :key="task.id"
              class="task-card my-3 mx-2"
              outlined
            >
              <v-card-title class="task-title">{{ task.title }}</v-card-title>
              <v-card-subtitle class="task-description">{{ task.description }}</v-card-subtitle>
              <v-card-text>Assignee: {{ task.assignee }}</v-card-text>
            </v-card>
          </draggable>
        </v-card>
      </div>
    </v-container>
  </template>
  
  <script>
  import draggable from "vuedraggable";
  
  export default {
    components: {
      draggable,
    },
    data() {
      return {
        // Board columns with tasks
        boardColumns: [
          {
            title: "To Do",
            tasks: [
              { id: 1, title: "Fix Bug", description: "Fix the login bug", assignee: "Alice" },
              { id: 2, title: "Add Feature", description: "Add search feature", assignee: "Bob" },
            ],
          },
          {
            title: "Doing",
            tasks: [
              { id: 3, title: "Write Tests", description: "Write unit tests for API", assignee: "Charlie" },
            ],
          },
          {
            title: "Test",
            tasks: [
              { id: 4, title: "Performance Test", description: "Test system load", assignee: "Eve" },
            ],
          },
          {
            title: "Done",
            tasks: [],
          },
        ],
        controlOnStart: false, // Track whether to clone
      };
    },
    methods: {
      // Handle the start of dragging to detect if Ctrl is pressed
      start(event) {
        this.controlOnStart = event.originalEvent.ctrlKey || event.originalEvent.metaKey;
      },
      // Define the pull function to clone based on controlOnStart
      pullFunction() {
        return this.controlOnStart ? "clone" : true;
      },
      onTaskDrop(event) {
        console.log("Task dropped:", event);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Main Board Styles */
  .board-container {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding: 1rem;
    background-color: #f5f5f5;
    border-radius: 8px;
  }
  
  .column {
    flex: 0 0 300px;
    display: flex;
    flex-direction: column;
    min-height: 70vh;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .task-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .task-card {
    cursor: grab;
    min-height: 80px;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .task-title {
    font-weight: bold;
  }
  
  .column-title {
    font-style: italic;
    color: gray;
  }
  
  .task-description {
    margin-top: 0.5rem;
    color: #555555;
  }
  </style>
  