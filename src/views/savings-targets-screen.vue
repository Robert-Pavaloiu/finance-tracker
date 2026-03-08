<template>
    <h1 class="text-3xl font-bold text-center mt-6">{{ globalsStore.language === 'en' ?
        'Savings Targets' : 'Ținte de Economii' }}</h1>
    <br />
    <SavingsTargetForm />
    <br />
    <AddSavingsContributionForm />
    <br />
    <SavingsTrackerTable />
</template>
<script setup lang="ts">
import SavingsTargetForm from '@/components/savings-target-form.vue';
import AddSavingsContributionForm from '@/components/add-savings-contribution-form.vue';
import SavingsTrackerTable from '@/components/savings-tracker-table.vue';
import { useGlobalsStore } from '@/stores/globals-store';
const globalsStore = useGlobalsStore();
</script>