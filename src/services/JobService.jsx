import { supabase } from '../config/supabaseClient'

export const getJobsFromDB = async () => {
    try {
        const { data, error } = await supabase
        .from('jobs')
        .select('*');

        if (error) throw error;

        return data;

    } catch (error) {
        console.error("Error en jobService:", error);
        return[
            { id: 1, title: "Desarrollador React Jr", company: "TechImpulse", salary: "$1,200 USD" },
            { id: 2, title: "Diseñador UI/UX", company: "CreativeStudio", salary: "$1,000 USD" }
        ];
    }
}

/*
export const getJobsFromDB = async () => {
  return [
    { id: 1, title: "Desarrollador React Jr", company: "TechImpulse", salary: "$1,200 USD" },
    { id: 2, title: "Diseñador UI/UX", company: "CreativeStudio", salary: "$1,000 USD" }
  ];
};
*/