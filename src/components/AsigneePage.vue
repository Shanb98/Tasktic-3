<!-- File: src/components/AssigneeList.vue -->

<template>
    <v-container>
      <!-- Search Bar and Header -->
      <v-row class="mb-4">
        <v-col cols="8">
          <v-text-field
            v-model="searchQuery"
            label="Search Assignees"
            outlined
            dense
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="4" class="text-right">
          <v-btn color="primary" @click="showDialog = true">Add New Assignee</v-btn>
        </v-col>
      </v-row>
  
      <!-- Assignee List Table -->
      <v-data-table
        :headers="headers"
        :items="filteredAssignees"
        :items-per-page="5"
        item-value="id"
        dense
        class="elevation-1"
      >
        <!-- Custom Actions Column -->
        <template slot="item.actions" slot-scope="{ item }">
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="updateAssignee(item)">
                <v-list-item-title>Update</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteAssignee(item)">
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
  
      <!-- Dialog for Adding New Assignee -->
      <v-dialog v-model="showDialog" max-width="500px">
        <v-card>
          <v-card-title>Add New Assignee</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="isValid">
              <v-text-field
                v-model="newAssignee.full_name"
                label="Full Name"
                outlined
                dense
                required
              ></v-text-field>
              <v-text-field
                v-model="newAssignee.username"
                label="Username"
                outlined
                dense
                required
              ></v-text-field>
              <v-text-field
                v-model="newAssignee.position"
                label="Position"
                outlined
                dense
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="createAssignee" :disabled="!isValid">
              Add
            </v-btn>
            <v-btn color="secondary" @click="showDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- Snackbar for Success Message -->
      <v-snackbar v-model="showSnackbar" color="success" timeout="3000">
        Assignee added successfully!
        <v-btn color="white" text @click="showSnackbar = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "AssigneeList",
    data() {
      return {
        assignees: [],
        searchQuery: "",
        showDialog: false,
        showSnackbar: false, // Controls the visibility of the snackbar
        isValid: false,
        newAssignee: {
          full_name: "",
          username: "",
          position: "",
        },
        headers: [
          { text: "ID", value: "id" },
          { text: "Full Name", value: "full_name" },
          { text: "Username", value: "username" },
          { text: "Position", value: "position" },
          { text: "Created At", value: "created_at" },
          { text: "Actions", value: "actions", sortable: false },
        ],
      };
    },
    computed: {
      filteredAssignees() {
        const query = this.searchQuery.toLowerCase();
        return this.assignees.filter(
          (assignee) =>
            assignee.full_name.toLowerCase().includes(query) ||
            assignee.username.toLowerCase().includes(query)
        );
      },
    },
    methods: {
      async fetchAssignees() {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/employees");
          this.assignees = response.data.map((assignee) => ({
            id: `ASG${assignee.id}`,
            full_name: assignee.full_name,
            username: assignee.username,
            position: assignee.position,
            created_at: this.formatDate(assignee.created_at),
          }));
        } catch (error) {
          console.error("Error fetching assignees:", error);
        }
      },
      async createAssignee() {
        try {
          // Send only necessary fields to the API
          const response = await axios.post("http://127.0.0.1:8000/api/employees", {
            full_name: this.newAssignee.full_name,
            username: this.newAssignee.username,
            position: this.newAssignee.position,
          });
  
          if (response.data) {
            // Push the new assignee to the list with formatted ID and current date
            this.assignees.push({
              ...this.newAssignee,
              id: `ASG${response.data.id}`,
              created_at: new Date().toLocaleDateString(),
            });
            // Reset form fields and close dialog
            this.newAssignee = { full_name: "", username: "", position: "" };
            this.showDialog = false;
            // Show success snackbar
            this.showSnackbar = true;
          }
        } catch (error) {
          console.error("Error creating assignee:", error);
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
      updateAssignee(assignee) {
        alert(`Update Assignee: ${assignee.full_name}`);
      },
      deleteAssignee(assignee) {
        if (confirm(`Are you sure you want to delete "${assignee.full_name}"?`)) {
          this.assignees = this.assignees.filter((a) => a.id !== assignee.id);
        }
      },
    },
    mounted() {
      this.fetchAssignees();
    },
  };
  </script>
  
  <style scoped>
  .elevation-1 thead th {
    color: #1976d2; /* Vuetify primary blue */
    font-weight: bold;
    text-align: left;
  }
  </style>
  