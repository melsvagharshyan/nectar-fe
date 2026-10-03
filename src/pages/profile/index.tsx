import { useCurrentUser } from "../../app/utils/hooks";
import { PageHead } from "../../components/PageHead";
import { PAGE } from "../../utils/styles";
import { PasswordCard } from "./components/PasswordCard";
import { PersonalInfoCard } from "./components/PersonalInfoCard";
import { ProfileOverviewCard } from "./components/ProfileOverviewCard";

export function Profile() {
  const user = useCurrentUser();
  if (!user) return null;
  return (
    <div className={PAGE}>
      <PageHead title="Мой профиль" subtitle="Фото, личные данные и безопасность аккаунта" />
      <div className="grid items-start gap-22 lg:grid-cols-[340px_minmax(0,1fr)]">
        <ProfileOverviewCard user={user} />
        <div className="flex flex-col gap-22">
          <PersonalInfoCard user={user} />
          <PasswordCard />
        </div>
      </div>
    </div>
  );
}
