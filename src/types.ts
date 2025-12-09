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

export type QuestionReport = {
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
    ];
    survey: Survey;
}

export type Option = {
  optionId: number;
  title: string;
  timeAdded: Date;
}

export type ResponseReport = {
  responseId: number;
  questionId: number;
  responseText: string;
  survey: Survey;
  question: QuestionReport;
  options: Option[];
  session: number;
  timeSubmitted: Date;
}


