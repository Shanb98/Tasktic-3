<template>
  <v-container>
    <!-- Search Bar and Header -->
    <v-row class="mb-4">
      <v-col cols="8">
        <v-text-field
          v-model="searchQuery"
          label="Search list"
          outlined
          dense
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="4" class="text-right">
        <v-btn color="primary" @click="openCreateProjectDialog">Create New Project</v-btn>
      </v-col>
    </v-row>

    <!-- Task List Table -->
    <v-data-table
      :headers="headers"
      :items="filteredTasks"
      :items-per-page="5"
      item-value="id"
      dense
      class="elevation-1 blue-header-text"
    >
      <!-- Custom Days Left Column -->
      <template slot="item.daysLeft" slot-scope="{ item }">
        <span :class="{ overdue: calculateDaysLeft(item.duedate) < 0 }">
          {{ calculateDaysLeft(item.duedate) }}
        </span>
      </template>

      <!-- Custom Actions Column -->
      <template slot="item.actions" slot-scope="{ item }">
        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="updateTask(item)">
              <v-list-item-title>Update</v-list-item-title>
            </v-list-item>
            <v-list-item @click="deleteTask(item)">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>

    <!-- Dialog for Creating New Project -->
    <v-dialog v-model="showDialog" max-width="800px">
      <v-card>
        <v-card-title>Create New Project</v-card-title>
        <v-card-text>
          <v-stepper v-model="step">
            <!-- Step 1: Project Details -->
            <v-stepper-header>
              <v-stepper-step :complete="step > 1" step="1">Project Details</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="step > 2" step="2">Categories</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="step > 3" step="3">Assignees</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-form ref="form" v-model="isValid">
                  <v-text-field
                    v-model="newProject.name"
                    label="Name"
                    outlined
                    dense
                    required
                  ></v-text-field>
                  <v-textarea
                    v-model="newProject.description"
                    label="Description"
                    outlined
                    dense
                    required
                  ></v-textarea>
                  <v-text-field
                    v-model="newProject.duedate"
                    label="Due Date"
                    type="date"
                    outlined
                    dense
                    required
                  ></v-text-field>
                </v-form>
                <v-btn color="primary" @click="step++" :disabled="!isValid">Next</v-btn>
              </v-stepper-content>

              <!-- Step 2: Add Categories -->
              <v-stepper-content step="2">
                <v-simple-table>
                  <thead>
                    <tr>
                      <th>Category Name</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(category, index) in categories" :key="index">
                      <td>{{ category.name }}</td>
                      <td>{{ category.description }}</td>
                      <td>
                        <v-btn icon color="red" @click="removeCategory(index)">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
                <v-row>
                  <v-col>
                    <v-text-field v-model="newCategory.name" label="Category Name" dense outlined></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field v-model="newCategory.description" label="Description" dense outlined></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-btn color="primary" @click="addCategory">Add</v-btn>
                  </v-col>
                </v-row>
                <v-btn color="primary" style="margin-right: 10px;" @click="step++">Next</v-btn>
                <v-btn color="secondary" @click="step--">Back</v-btn>
              </v-stepper-content>

              <!-- Step 3: Assign Assignees -->
              <v-stepper-content step="3">
                <v-data-table
                  :headers="assigneeHeaders"
                  :items="employees"
                  item-value="id"
                  v-model="selectedAssignees"
                  show-select
                  dense
                ></v-data-table>
                <v-btn color="primary" style="margin-right: 10px;" @click="submitProject">Submit</v-btn>
                <v-btn color="secondary" @click="step--">Back</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="showDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: "",
      tasks: [],
      step: 1,
      selectedAssignees: [],
      showDialog: false,
      newProject: {
        name: "",
        description: "",
        duedate: "",
      },
      newCategory: { name: "", description: "" },
      categories: [],
      employees: [],
      assigneeHeaders: [
        { text: "ID", value: "id" },
        { text: "Full Name", value: "full_name" },
        { text: "Username", value: "username" },
        { text: "Position", value: "position" },
      ],
      headers: [
        { text: "Name", value: "name" },
        { text: "Key", value: "key" },
        { text: "Description", value: "description" },
        { text: "Start Date", value: "created_at" },
        { text: "Due Date", value: "duedate" },
        { text: "Days Left", value: "daysLeft" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    filteredTasks() {
      const query = this.searchQuery.toLowerCase();
      return this.tasks.filter(
        (task) =>
          task.name.toLowerCase().includes(query) ||
          `TBT-${task.id}`.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/project");
        const projects = response.data.projects;

        this.tasks = projects.map((project) => ({
          id: project.id,
          name: project.name,
          key: `TBT-${project.id}`,
          description: project.description,
          created_at: this.formatDate(project.created_at),
          duedate: project.duedate,
        }));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    async fetchEmployees() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/employees");
      this.employees = response.data.map((employee) => ({
        id: `ASG${employee.id}`,
        rawId:employee.id,
        full_name: employee.full_name,
        username: employee.username,
        position: employee.position,
      }));
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  },
    addCategory() {
      if (this.newCategory.name && this.newCategory.description) {
        this.categories.push({ ...this.newCategory });
        this.newCategory = { name: "", description: "" };
      }
    },
    removeCategory(index) {
      this.categories.splice(index, 1);
    },
    resetStepper() {
      this.step = 1; // Reset to the first step
      this.newProject = { name: "", description: "", duedate: "" }; // Clear project details
      this.categories = []; // Clear categories
      this.selectedAssignees = []; // Clear selected assignees
    },
    // Method to open dialog and reset stepper
    openCreateProjectDialog() {
      this.resetStepper();
      this.showDialog = true; // Open the dialog
    },
    async submitProject() {
      console.log(this.newProject.name)

      console.log({
        project: this.newProject,
        categories: this.categories,
        assignees: this.selectedAssignees,
      });
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/project", {
          name: this.newProject.name,
          description: this.newProject.description,
          duedate: this.newProject.duedate,
        });
        if (response.data) {
          console.log(response.data.project.id)
          for (const assignee of this.selectedAssignees) {
            try {
              const putResponse = await axios.put(`http://127.0.0.1:8000/api/employees/${assignee.rawId}`, {
                full_name: assignee.full_name,
                username: assignee.username,
                position: assignee.position,
                project_id: response.data.project.id, // Assign the project ID
              });
              console.log(`Updated assignee ${assignee.id}:`, putResponse.data);
            } catch (putError) {
              console.error(`Error updating assignee ${assignee.id}:`, putError);
            }
          }
          for (const category of this.categories) {
            try {
              const postResponse = await axios.post("http://127.0.0.1:8000/api/categories", {
                name: category.name,
                description: category.description,
                project_id: response.data.project.id, // Assign the project ID
              });
              console.log(`Updated Category:`, postResponse.data);
            } catch (pstError) {
              console.error(`Error updating category:`, pstError);
            }
          }
        }
        this.fetchTasks();
        this.fetchEmployees();
        } catch (error) {
          console.error("Error creating assignee:", error);
      }
      this.showDialog = false;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    calculateDaysLeft(dueDate) {
      const due = new Date(dueDate);
      const today = new Date();
      const timeDiff = due - today;
      return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    },
  },
  mounted() {
    this.fetchTasks();
    this.fetchEmployees();
  },
};
</script>

<style scoped>
.overdue {
  color: red;
  font-weight: bold;
}
.blue-header-text thead th {
  color: #1976d2; /* Vuetify primary blue */
  font-weight: bold;
  text-align: left;
}
</style>
