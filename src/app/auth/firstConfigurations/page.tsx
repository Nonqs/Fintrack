"use client"
import FirstPage from "@/components/pagination/FirstPage";
import SecondPage from "@/components/pagination/SecondPage";
import ThirdPage from "@/components/pagination/ThirdPage";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Pagination, Tooltip } from "@nextui-org/react";
import { useState } from "react";



export default function FirstConfiguration() {

    const [currentPage, setCurrentPage] = useState(1);
    const pagesTitles = [
        {title: "Add your accounts", tooltip: "Add the accounts where you manage your money.", tooltip2:"Example : Bank, PayPal, Cash..."},
        {title: "Add your income types", tooltip: "Add your sources of income.", tooltip2:"Example: Work, Freelance, Gifts..."},
        {title: "Add your expenses types", tooltip: "Add your main expenses.", tooltip2:"Example: Groceries, Entertainment, Healthcare..."},
    ]

    return (
        <div className="w-full h-[90vh] flex justify-center items-center">
            <Card className="w-1/3 h-6/7">
                <CardHeader className="justify-center my-5">
                    <div className="flex flex-col items-center gap-5">
                        <Pagination
                            initialPage={1}
                            total={3}
                            page={currentPage}
                            onChange={setCurrentPage}
                        />
                        <div className="flex gap-2">
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <h4 className="font-bold text-xl">Lets start your first configuration</h4>
                            <article className="flex items-center">
                                <span>{pagesTitles[currentPage-1].title}</span>
                                <Tooltip content={
                                    <div className="flex flex-col">
                                        <span className="mb-2">{pagesTitles[currentPage-1].tooltip}</span>
                                        <span>{pagesTitles[currentPage-1].tooltip2}</span>
                                    </div>
                                }>
                                    <div className="inline-block relative rounded-large bg-default-200 p-1 ms-2">
                                        <svg className="w-3" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" enableBackground="new 0 0 52 52"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M26.7,42.8c0.8,0,1.5,0.7,1.5,1.5v3.2c0,0.8-0.7,1.5-1.5,1.5h-3.2c-0.8,0-1.5-0.7-1.5-1.5v-3.2 c0-0.8,0.7-1.5,1.5-1.5H26.7z"></path> <path d="M28.2,35.1c0-2.1,1.3-4,3.1-4.8h0.1c5.2-2.1,8.8-7.2,8.8-13.2c0-7.8-6.4-14.2-14.2-14.2 c-7.2,0-13.2,5.3-14.2,12.2v0.1c-0.1,0.9,0.6,1.6,1.5,1.6h3.2c0.8,0,1.4-0.5,1.5-1.1v-0.2c0.7-3.7,4-6.5,7.9-6.5 c4.5,0,8.1,3.6,8.1,8.1c0,2.1-0.8,4-2.1,5.5l-0.1,0.1c-0.9,1-2.1,1.6-3.3,2c-4,1.4-6.7,5.2-6.7,9.4v1.5c0,0.8,0.6,1.4,1.4,1.4h3.2 c0.8,0,1.6-0.6,1.6-1.5L28.2,35.1z"></path> </g> </g></svg>
                                    </div>
                                </Tooltip>
                            </article>
                        </div>
                        <Divider />
                    </div>
                </CardHeader>
                <CardBody className="mb-5">
                    {currentPage === 1 &&
                        <FirstPage />
                    }
                    {currentPage === 2 &&
                        <SecondPage />
                    }
                    {currentPage === 3 &&
                        <ThirdPage />
                    }
                </CardBody>
                <CardFooter className="justify-between">
                    <Button
                        size="md"
                        variant="flat"
                        color="primary"
                        onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
                    >
                        Previous
                    </Button>
                    <Button
                        size="md"
                        variant="flat"
                        color="primary"
                        onPress={() => setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))}
                    >
                        Next
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}