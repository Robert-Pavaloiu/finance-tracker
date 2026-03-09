<template>
    <h1 class="text-3xl font-bold text-center my-6 dark:text-white">{{ globalsStore.language === 'en' ?
        'Savings Targets' : 'Ținte de Economii' }}</h1>
    <SavingsProgressBar />
    <div class="mt-8">
        <SavingsTargetForm />
    </div>
    <div class="mt-8">
        <AddSavingsContributionForm />
    </div>
    <div class="mt-8">
        <SavingsTrackerTable />
    </div>
</template>
<script setup lang="ts">
import SavingsTargetForm from '@/components/savings-target-form.vue';
import AddSavingsContributionForm from '@/components/add-savings-contribution-form.vue';
import SavingsTrackerTable from '@/components/savings-tracker-table.vue';
import SavingsProgressBar from '@/components/savings-progress-bar.vue';
import { useGlobalsStore } from '@/stores/globals-store';
const globalsStore = useGlobalsStore();
</script>