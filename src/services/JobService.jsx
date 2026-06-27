import { supabase } from '../config/supabaseClient'

export const getJobsFromDB = async () => {
    try {
        // Hacemos un JOIN automático apuntando a la tabla 'companies'
        const { data, error } = await supabase
        .from('jobs')
        .select(`
            id,
            company_id,
            title,
            description,
            salary,
            modality,
            vacancies_count,
            status,
            created_at,
            companies (
                company_name,
                logo_url,
                sector
            )
        `)
        .eq('status', 'active'); // Traer solo las vacantes abiertas

        if (error) throw error;

        return data;

    } catch (error) {
        console.error("Error en jobService:", error);
        // Fallback simétrico con el nuevo modelo relacional de WallMexico
        return [
            { 
                id: 1, 
                title: "Desarrollador React Jr", 
                salary: "18000.00", 
                modality: "hybrid",
                companies: { company_name: "TechSolutions México", logo_url: "https://placehold.co/100" } 
            },
            { 
                id: 2, 
                title: "Diseñador UI/UX", 
                salary: "35000.00", 
                modality: "remote",
                companies: { company_name: "CreativeStudio", logo_url: "https://placehold.co/100" } 
            }
        ];
    }
}