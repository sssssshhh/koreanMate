
// export async function getContentsByChapterId(chapterId: string): Promise<ChapterContent[]> {
//   const res = await fetch(`/api/chapters/${chapterId}/contents`)
//   if (!res.ok) throw new Error('Failed to fetch contents')
//   return res.json()
// }

// // GET /api/chapters/{chapterId}/quizzes
// export async function getQuizzesByChapterId(chapterId: string): Promise<Quiz[]> {
//   const res = await fetch(`/api/chapters/${chapterId}/quizzes`)
//   // [
//   //   {
//   //     "id": "quiz-001",
//   //     "pieces": ["공항에", "갔어요.", "저는", "택시를", "타고"]
//   //   }  
//   // ]
//   if (!res.ok) throw new Error('Failed to fetch quizzes')
//   return res.json()
// }

// // POST /api/quiz/submit
// export async function submitQuiz(quizId: string, answer: string[]): Promise<void> {
//   const res = await fetch(`/api/quiz/submit`, {
//     method: 'POST',
//     body: JSON.stringify({ quizId, answer }),
//   })
  // post request
  // {
  //   "quizId": "quiz-001",
  //   "submitted": ["저는", "택시를", "타고", "공항에", "갔어요."]
  // }

//   // response
//   // {
//   //   "correct": true,
//   //   "explanation": "정답입니다!"
//   // }
// }