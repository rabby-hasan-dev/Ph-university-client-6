import { z } from "zod";


export const academicSemesterSchema = z.object({

    name: z.string({ required_error: "Please Select a Name" }),
    year: z.string({ required_error: "Please Select a Year" }),
    startMonth: z.string({ required_error: "Please Select a StartMonth" }),
    endMonth: z.string({ required_error: "Please Select a EndMonth" }),

})