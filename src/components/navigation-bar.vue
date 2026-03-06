<template>
    <nav class="bg-gray-800 p-4">
        <div class="container mx-auto flex items-center justify-between">
            <RouterLink to="/" class="text-white text-lg font-bold">Finance Tracker</RouterLink>
            <ul class="flex space-x-4">
                <li>
                    <RouterLink to="/" class="text-gray-300 hover:text-white">Home</RouterLink>
                </li>
                <li>
                    <RouterLink to="/budgets" class="text-gray-300 hover:text-white">Budgets</RouterLink>
                </li>
                <li>
                    <RouterLink to="/settings" class="text-gray-300 hover:text-white">Settings</RouterLink>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script setup lang="ts"></script>