use anchor_lang::prelude::*;
use anchor_lang::solana_program::{entrypoint::ProgramResult, system_instruction};

declare_id!("EKhRfxbtNv4LgstBUAS2x29wshPVCNVeMUcwEBE9MMy");

#[program]
pub mod healthcare_sol {
    use super::*;
    pub fn register_user(
        ctx: Context<RegisterUser>,
        first_name: String,
        last_name: String,
        age: u8,
        image: String,
        address: String,
    ) -> ProgramResult {
        let user_account = &mut ctx.accounts.user_account;

        user_account.first_name = first_name;
        user_account.last_name = last_name;
        user_account.age = age;
        user_account.image = image;
        user_account.address = address;
        user_account.authority = ctx.accounts.authority.key();
        Ok(())
    }

    pub fn register_doctor(
        ctx: Context<RegisterDoctor>,
        name: String,
        qualification: String,
        image: String,
        specialization: String,
        description: String,
        address: String,
        rating: u8,
        language: String,
        doctor_email: String,
    ) -> ProgramResult {
        let doctor_account = &mut ctx.accounts.doctor_account;

        doctor_account.name = name;
        doctor_account.qualification = qualification;
        doctor_account.image = image;
        doctor_account.specialization = specialization;
        doctor_account.description = description;
        doctor_account.address = address;
        doctor_account.rating = rating;
        doctor_account.language = language;
        doctor_account.doctor_email = doctor_email;
        doctor_account.authority = ctx.accounts.authority.key();

        // Add doctor account address to the global registry
        let registry_account = &mut ctx.accounts.registry_account;
        registry_account.doctor_addresses.push(doctor_account.key());

        Ok(())
    }

    pub fn transfer_fee(ctx: Context<TransferFee>, amount: u64) -> ProgramResult {
        let ix = system_instruction::transfer(&ctx.accounts.user_authority.key(), &ctx.accounts.doctor_authority.key(), amount);
        solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.user_authority.to_account_info(),
                ctx.accounts.doctor_authority.to_account_info(),
            ],
        )?;
        Ok(())
    }

    pub fn initialize_registry(ctx: Context<InitializeRegistry>) -> ProgramResult {
        let registry_account = &mut ctx.accounts.registry_account;
        registry_account.doctor_addresses = Vec::new(); // Initialize with empty vector
        Ok(())
    }

    pub fn get_doctor_registry(ctx: Context<GetDoctorRegistry>) -> ProgramResult {
        let registry_account = &ctx.accounts.registry_account;
        // Here you can implement logic to return the registry data if needed
        Ok(())
    }
}

#[derive(Accounts)]
pub struct RegisterUser<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 32 + 1 + 256 + 256 + 32, // Adjust space
        seeds = [b"user", authority.key().as_ref()],
        bump
    )]
    pub user_account: Account<'info, UserState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RegisterDoctor<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 64 + 256 + 256 + 128 + 128 + 32 + 1 + 64 + 256 + 32, // Adjust space
        seeds = [b"doctor", authority.key().as_ref()],
        bump
    )]
    pub doctor_account: Account<'info, DoctorState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
    #[account(
        mut,
        seeds = [b"registry"],
        bump
    )]
    pub registry_account: Account<'info, DoctorRegistry>,
}

#[derive(Accounts)]
pub struct TransferFee<'info> {
    #[account(mut)]
    pub user_authority: Signer<'info>,
    #[account(mut)]
    pub doctor_authority: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitializeRegistry<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 4 * 100, // Adjust space for doctor_addresses
        seeds = [b"registry"],
        bump
    )]
    pub registry_account: Account<'info, DoctorRegistry>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct GetDoctorRegistry<'info> {
    #[account(
        seeds = [b"registry"],
        bump
    )]
    pub registry_account: Account<'info, DoctorRegistry>,
}

#[account]
pub struct UserState {
    pub first_name: String,
    pub last_name: String,
    pub age: u8,
    pub image: String,
    pub address: String,
    pub authority: Pubkey,
}

#[account]
pub struct DoctorState {
    pub name: String,
    pub qualification: String,
    pub image: String,
    pub specialization: String,
    pub description: String,
    pub address: String,
    pub rating: u8,
    pub language: String,
    pub doctor_email: String,
    pub authority: Pubkey,
}

#[account]
pub struct DoctorRegistry {
    pub doctor_addresses: Vec<Pubkey>,
}
