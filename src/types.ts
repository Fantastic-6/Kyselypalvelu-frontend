export type Survey = {
    surveyId: number;
    title: string;
    description: string;
    deadlineDate: string;
    deadlineTime: string;
    
}
//export type Question = {
//    questionId: number;
//    questionText: string;
//    isRequired: boolean;
//    questionType: string;
//    orderNumber: number;
//}

export type Question = {
    questionId: number;
    questionText: string;
    isRequired: boolean;
    questionType: string;
    orderNumber: number;
    options: [
      {
        optionId: number;
        title: string;
        timeAdded: string;
      }
    ]
}


